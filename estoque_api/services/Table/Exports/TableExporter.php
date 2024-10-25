<?php

namespace Services\Table\Exports;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Facades\Excel;
use Services\Table\Core\Table;

abstract class TableExporter implements FromQuery, WithMapping, WithHeadings, ShouldAutoSize
{
    public function __construct(
        private readonly Table               $table,
        private readonly TableExportTypeEnum $exportType,
        private readonly Request             $request
    )
    {
    }

    public function query(): Builder|Relation|EloquentBuilder
    {
        if ($this->exportType === TableExportTypeEnum::PAGE) {
            return $this->table->builder($this->request);
        }
        return $this->table->builderRaw($this->request);
    }

    abstract public function headings(): array;

    abstract public function map(mixed $row): array;

    public function download(string $fileName): string
    {
        header('Content-DocType: File Transfer');
        header('Content-AcervoType: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Transfer-Encoding: Binary");
        header("Content-disposition: attachment; filename=\"" . $fileName . "\"");
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');

        return Excel::raw(
            $this,
            \Maatwebsite\Excel\Excel::XLSX
        );
    }


    public static function all(Table $table, Request $request): self
    {
        $class = get_called_class();
        return (new $class($table, TableExportTypeEnum::ALL, $request));
    }

    public static function page(Table $table, Request $request): self
    {
        $class = get_called_class();
        return (new $class($table, TableExportTypeEnum::PAGE, $request));
    }
}
