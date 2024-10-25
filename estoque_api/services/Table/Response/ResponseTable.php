<?php

namespace Services\Table\Response;

use Illuminate\Http\Request;
use Services\Table\Core\Table;
use Services\Table\Core\TableDataObject;

abstract class ResponseTable extends Table
{
    private ?TableDataObject $data;
    private ?Request $request;

    public function __construct(?Request $request = null)
    {
        parent::__construct();

        $this->data = null;
        $this->request = $request ?? request();
        if (isset($this->request->pageSize)) {
            $this->repository->setLimit($this->request->pageSize);
        }
        if (isset($this->request->page)) {
            $this->repository->setPage($this->request->page);
        }
    }

    public function setRequest(?Request $request): ResponseTable
    {
        $this->request = $request;
        if (isset($this->request->pageSize)) {
            $this->repository->setLimit($this->request->pageSize);
        }
        return $this;
    }

    public function toObject(): TableDataObject
    {
        if (!$this->data) {
            $this->render();
        }

        return $this->data;
    }

    public function toArray(): array
    {
        if (!$this->data) {
            $this->render();
        }

        return $this->data->toArray();
    }

    public function toJson(): string
    {
        if (!$this->data) {
            $this->render();
        }

        return $this->data->toJson();
    }

    public function render(): void
    {
        if ($this->request) {
            $this->data = new TableDataObject();
            $this->data->data = $this->generate($this->request);
            $this->data->errors = $this->getTableRepository()->getErrors();
            $this->data->filtersApplied = $this->getTableRepository()->getFiltersApplied();
            $this->data->classification = $this->getTableRepository()->getClassification();
            $this->data->order = $this->getTableRepository()->getOrder();
            $this->data->limit = $this->getTableRepository()->getLimit();
            $this->data->maxPages = $this->getTableRepository()->maxPages();
            $this->data->total = $this->getTableRepository()->total();
        }
    }
}
