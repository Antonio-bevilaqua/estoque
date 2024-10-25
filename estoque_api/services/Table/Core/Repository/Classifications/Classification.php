<?php

namespace Services\Table\Core\Repository\Classifications;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class Classification
{
    public function apply(Builder $builder, Request $request): void
    {
        $order = $request->order ?? "DESC";
        $builder->orderBy($this->getKey(), $order);
    }

    abstract protected function getKey(): string;

    abstract public function getRequestKey(): string;
}
