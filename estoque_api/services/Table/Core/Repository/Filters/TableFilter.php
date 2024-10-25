<?php

namespace Services\Table\Core\Repository\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Services\Table\Core\Repository\Filters\Exceptions\InvalidValueException;

abstract class TableFilter
{
    protected mixed $filterValue;

    protected string $error;
    protected bool $filterApplied = false;

    public function apply(Builder $builder, Request $request): bool
    {
        try {
            $filterKey = $this->getRequestKey();
            $this->filterValue = $this->maskValue($request->$filterKey);
            $this->applyFilter($builder);
            return true;
        } catch (InvalidValueException $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }

    protected function maskValue(mixed $value): mixed
    {
        if (!$value) return null;
        return $value;
    }

    abstract public function getRequestKey(): string;

    /**
     * @throws InvalidValueException
     */
    abstract protected function applyFilter(Builder $builder): void;


    public function value(): mixed
    {
        return $this->filterValue;
    }

    /**
     * @return string
     */
    public function getError(): string
    {
        return $this->error;
    }

    /**
     * @return bool
     */
    public function isFilterApplied(): bool
    {
        return $this->filterApplied;
    }
}
