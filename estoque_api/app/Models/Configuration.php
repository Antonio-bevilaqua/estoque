<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string company
 * @property ?string cnpj
 * @property ?string whatsapp
 * @property ?string phone
 * @property ?string email
 * @property Carbon created_at
 * @property Carbon updated_at
 */
class Configuration extends Model
{
    protected $fillable = [
        'company',
        'cnpj',
        'whatsapp',
        'phone',
        'email'
    ];
}
