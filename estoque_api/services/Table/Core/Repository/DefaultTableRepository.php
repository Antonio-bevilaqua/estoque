<?php

namespace Services\Table\Core\Repository;

class DefaultTableRepository extends TableRepository
{
    protected function countResults(): int
    {
        return $this->builder->count();
    }
}
