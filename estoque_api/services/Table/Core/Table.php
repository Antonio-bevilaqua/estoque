<?php

namespace Services\Table\Core;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Services\Table\Core\Repository\Classifications\Classification;
use Services\Table\Core\Repository\Classifications\IdClassification;
use Services\Table\Core\Repository\DefaultTableRepository;
use Services\Table\Core\Repository\TableRepository;

abstract class Table
{
    protected TableRepository $repository;

    public function __construct()
    {
        $this->setTableRepository();
        $this->repository->setOrder($this->getDefaultDirection(), $this->getDefaultLimit());
        $this->initialize();
    }

    private function initialize(): void
    {
        $filters = $this->getFilters();
        $classifications = $this->getClassifications();
        $postClassifications = $this->getPostClassifications();

        foreach ($filters as $filter) {
            $this->repository->addFilter($filter);
        }

        foreach ($classifications as $classification) {
            $this->repository->addClassification($classification);
        }

        foreach ($postClassifications as $postClassification) {
            $this->repository->addPostClassification($postClassification);
        }
    }

    protected function setTableRepository(): void
    {
        $this->repository = new DefaultTableRepository(
            $this->getBuilder(),
            $this->getDefaultClassification()
        );
    }

    protected function getDefaultClassification(): Classification
    {
        return new IdClassification();
    }

    protected function getDefaultDirection(): string
    {
        return "DESC";
    }

    protected function getDefaultLimit(): int
    {
        return 15;
    }

    abstract protected function getBuilder(): Builder;

    /**
     * @param Request $request
     * @return Collection<int, Model>
     */
    public function generate(Request $request): Collection
    {
        return $this->repository
            ->filtersFromRequest($request)
            ->classificationsFromRequest($request)
            ->get($request);
    }

    /**
     * @param Request $request
     * @return Collection<int, Model>
     */
    public function all(Request $request): Collection
    {
        return $this->repository
            ->filtersFromRequest($request)
            ->classificationsFromRequest($request)
            ->all($request);
    }

    public function builder(Request $request): Builder
    {
        return $this->repository
            ->filtersFromRequest($request)
            ->classificationsFromRequest($request)
            ->getBuild();
    }

    public function builderRaw(Request $request): Builder
    {
        return $this->repository
            ->filtersFromRequest($request)
            ->classificationsFromRequest($request)
            ->getBuildRaw();
    }

    abstract protected function getFilters(): array;

    abstract protected function getClassifications(): array;

    abstract protected function getPostClassifications(): array;

    public function getTableRepository(): TableRepository
    {
        return $this->repository;
    }
}
