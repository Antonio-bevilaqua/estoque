<?php

namespace Services\Table\Core\Repository\Classifications;

class CreatedClassification extends Classification
{

    protected function getKey(): string
    {
        return "created_at";
    }

    public function getRequestKey(): string
    {
        return "criacao";
    }
}
