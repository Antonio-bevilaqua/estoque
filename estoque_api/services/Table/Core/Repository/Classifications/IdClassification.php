<?php

namespace Services\Table\Core\Repository\Classifications;

class IdClassification extends Classification
{
    protected function getKey(): string
    {
        return "id";
    }

    public function getRequestKey(): string
    {
        return "id";
    }
}
