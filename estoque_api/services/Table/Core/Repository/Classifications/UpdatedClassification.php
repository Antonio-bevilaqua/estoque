<?php

namespace Services\Table\Core\Repository\Classifications;

class UpdatedClassification extends Classification
{

    protected function getKey(): string
    {
        return "updated_at";
    }

    public function getRequestKey(): string
    {
        return "atualizacao";
    }
}
