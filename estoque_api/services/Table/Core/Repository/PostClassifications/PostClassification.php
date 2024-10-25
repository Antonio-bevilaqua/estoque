<?php

namespace Services\Table\Core\Repository\PostClassifications;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

interface PostClassification
{
    public function classificate(Collection $elements, Request $request): Collection;
}
