<?php

namespace Services\Table\Core\Repository\Filters\Exceptions;

use Exception;

class InvalidValueException extends Exception
{
    public function __construct(string $message)
    {
        parent::__construct($message);
    }
}
