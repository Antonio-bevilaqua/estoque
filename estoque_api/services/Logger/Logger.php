<?php

namespace Services\Logger;

use Illuminate\Support\Facades\Log;

class Logger
{
    private string $channel = "logger";
    private string $logType = 'info';
    private string|array $message;
    private ?array $data = null;

    protected function log(): void
    {
        Log::channel($this->channel)->{$this->logType}("====================================== <LOGGING> ============================================");
        if (is_string($this->message)) {
            Log::channel($this->channel)->{$this->logType}($this->message);
        } else {
            foreach ($this->message as $msg) {
                Log::channel($this->channel)->{$this->logType}($msg);
            }
        }
        if ($this->data) {
            Log::channel($this->channel)->{$this->logType}("Data: " . print_r($this->data, true));
        }
        Log::channel($this->channel)->{$this->logType}("===================================== </LOGGING> ============================================");
    }

    public function channel(string $channel): self
    {
        $this->channel = $channel;
        return $this;
    }

    public function type(string $type): self
    {
        if ($type !== 'info' && $type !== 'warning' && $type !== 'error') {
            $type = 'info';
        }
        $this->logType = $type;
        return $this;
    }

    public function msg(string $msg): void
    {
        $this->message = $msg;
        $this->log();
    }

    public function exception(\Throwable $e, ?string $message = null): void
    {
        $this->message = [];
        $this->data = null;
        $this->message[] = "";
        if ($message) $this->message[] = $message;

        $this->message[] = "{$e->getMessage()} at {$e->getFile()}({$e->getLine()})";
        foreach ($e->getTrace() as $k => $trace) {
            $file = $trace['file'] ?? "";
            $line = $trace['line'] ?? "";
            $class = $trace['class'] ?? "";
            $type = $trace['type'] ?? "";
            $function = $trace['function'] ?? "";
            $message = "#{$k} {$file}({$line}): ";
            $message .= "{$class}{$type}{$function}()";
            $this->message[] = $message;
            if ($k >= 49) break;
        }
        $this->channel = "errors";
        $this->log();
    }
}
