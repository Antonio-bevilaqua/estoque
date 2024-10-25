<?php

namespace Reports\UseCases\DRE;

use Carbon\Carbon;

class GenerateDTO
{
    public function __construct(
        public Carbon $initialDate,
        public Carbon $finalDate,
    )
    {

    }
}
