<?php

namespace Expenses\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string title
 * @property string description
 * @property float value
 * @property string|Carbon created_at
 * @property string|Carbon updated_at
 */
class Expense extends Model
{
    protected $fillable = [
        'title',
        'description',
        'value',
    ];
}
