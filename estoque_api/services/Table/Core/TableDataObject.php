<?php

namespace Services\Table\Core;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Throwable;

class TableDataObject
{
    public Collection $data;
    public array $errors;
    public array $filtersApplied;
    public string $classification;
    public string $order;
    public int $limit;
    public int $maxPages;
    public int $total;

    public function __construct()
    {
        $this->data = new Collection();
        $this->errors = [];
        $this->filtersApplied = [];
        $this->classification = "";
        $this->order = "";
        $this->limit = 0;
        $this->maxPages = 0;
        $this->total = 0;
    }

    public function toArray(): array
    {
        return [
            "data" => $this->data,
            "errors" => $this->errors,
            "filtersApplied" => $this->filtersApplied,
            "classification" => $this->classification,
            "order" => $this->order,
            "limit" => $this->limit,
            "maxPages" => $this->maxPages,
            "total" => $this->total
        ];
    }


    public function toJson(): string
    {
        try {
            return json_encode($this->toArray(), JSON_THROW_ON_ERROR);
        } catch (Throwable $exception) {
            Log::error($exception->getMessage());
            return '';
        }
    }
}
