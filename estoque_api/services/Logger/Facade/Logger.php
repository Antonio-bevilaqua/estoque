<?php

namespace Services\Logger\Facade;

use Services\Logger\Logger as LoggerLogger;

/**
 * @method static \Services\Logger\Logger type(string $type)
 * @method static \Services\Logger\Logger channel(string $channel)
 * @method static void exception(\Throwable $e, string $message = null)
 *
 * @see \Services\Logger\Logger
 */
class Logger
{

    public static function __callStatic($method, $args)
    {
        $instance = new LoggerLogger();
        return $instance->{$method}(...$args);
    }
}
