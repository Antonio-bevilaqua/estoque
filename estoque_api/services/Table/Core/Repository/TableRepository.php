<?php

namespace Services\Table\Core\Repository;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Services\Table\Core\Repository\Classifications\Classification;
use Services\Table\Core\Repository\Filters\TableFilter;
use Services\Table\Core\Repository\PostClassifications\PostClassification;

abstract class TableRepository
{
    protected Builder $builder;
    protected array $filtersApplied;
    protected ?string $classification;
    protected string $order;
    protected int $limit;
    protected int $page;

    protected ?int $total;

    /**
     * @var array<int, TableFilter>
     */
    protected array $filters;

    /**
     * @var Classification[]
     */
    protected array $classifications;

    /**
     * @var PostClassification[]
     */
    protected array $postClassifications;

    protected array $errors = [];

    public function __construct(Builder $builder, Classification $defaultClassification)
    {
        $this->builder = $builder;
        $this->filtersApplied = [];
        $this->filters = [];
        $this->postClassifications = [];
        $this->order = "DESC";
        $this->limit = 10;
        $this->total = null;
        $this->page = 1;
        $this->setDefaultClassification($defaultClassification);
    }

    public function setDefaultClassification(Classification $defaultClassification): self
    {
        $this->classifications = [
            $defaultClassification
        ];
        $this->classification = $this->classifications[0]->getRequestKey();
        return $this;
    }

    public function addFilter(TableFilter $filter): self
    {
        $this->filters[] = $filter;
        return $this;
    }

    public function addClassification(Classification $classification): self
    {
        $this->classifications[] = $classification;
        return $this;
    }

    public function addPostClassification(PostClassification $postClassification): self
    {
        $this->postClassifications[] = $postClassification;
        return $this;
    }

    public function setOrder(string $order = "DESC", int $limit = 10): self
    {
        $this->order = $order;
        $this->limit = $limit;
        return $this;
    }

    public function setLimit(int $limit = 10): self
    {
        $this->limit = $limit;
        return $this;
    }

    public function filtersFromRequest(Request $request): self
    {
        foreach ($this->filters as $filter) {

            if (!$filter->apply($this->builder, $request)) {
                $this->errors[] = $filter->getError();
            }

            if ($filter->isFilterApplied()) {
                $this->filtersApplied[$filter->getRequestKey()] = $filter->value();
            }
        }

        return $this;
    }

    public function classificationsFromRequest(Request $request): self
    {
        $checkClassification = !empty($request->classification) ?
            $request->classification
            : $this->classification;
        $this->order = $request->order ?? "DESC";

        foreach ($this->classifications as $classification) {
            if ($checkClassification !== $classification->getRequestKey()) {
                continue;
            }

            $classification->apply($this->builder, $request);

            return $this;
        }

        return $this;
    }

    public function getBuild(): Builder
    {
        $builder = clone $this->builder;
        $builder->limit($this->limit);

        $offset = isset($this->page) ? ($this->page - 1) * $this->limit : 0;
        if ($offset > 0) {
            $builder->offset($offset);
        }

        return $builder;
    }

    public function getBuildRaw(): Builder
    {
        return clone $this->builder;
    }

    public function get(Request $request): Collection
    {
        return $this->postClassification($this->getBuild()->get(), $request);
    }


    public function all(Request $request): Collection
    {
        $this->total = null;
        return $this->postClassification($this->getBuildRaw()->get(), $request);
    }

    abstract protected function countResults(): int;

    public function maxPages(): int
    {
        $this->setTotalValue();
        return ceil($this->total / $this->limit);
    }

    public function total(): int
    {
        $this->setTotalValue();
        return $this->total;
    }

    private function setTotalValue(): void
    {
        if ($this->total === null) {
            $this->total = $this->countResults();
        }
    }

    protected function postClassification(Collection $elements, Request $request): Collection
    {
        $this->classification = $request->classification ?? $this->classification;
        $this->order = $request->order ?? "DESC";

        foreach ($this->postClassifications as $classification) {
            $elements = $classification->classificate($elements, $request);
        }

        return $elements;
    }

    /**
     * @return array
     */
    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * @return array
     */
    public function getFiltersApplied(): array
    {
        return $this->filtersApplied;
    }

    /**
     * @return string
     */
    public function getClassification(): string
    {
        return $this->classification;
    }

    /**
     * @return string
     */
    public function getOrder(): string
    {
        return $this->order;
    }

    /**
     * @return int
     */
    public function getLimit(): int
    {
        return $this->limit;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function setPage(int $page): void
    {
        $this->page = $page;
    }
}
