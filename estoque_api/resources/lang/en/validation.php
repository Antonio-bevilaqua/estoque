<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => ':attribute deve ser aceito.',
    'active_url' => ':attribute não é uma URL válida.',
    'after' => ':attribute deve ser uma data maior que :date.',
    'after_or_equal' => ':attribute deve ser uma data maior ou igual a :date.',
    'alpha' => ':attribute deve conter apenas letras.',
    'alpha_dash' => ':attribute deve conter apenas letras, números e traços.',
    'alpha_num' => ':attribute deve conter apenas letras e números.',
    'array' => ':attribute deve ser uma array.',
    'before' => ':attribute deve ser uma data menor que :date.',
    'before_or_equal' => ':attribute deve ser uma data menor ou igual a :date.',
    'between' => [
        'numeric' => ':attribute deve estar entre :min e :max.',
        'file' => ':attribute deve estar entre :min e :max kilobytes.',
        'string' => ':attribute deve ter entre :min e :max caracteres.',
        'array' => ':attribute deve ter entre :min e :max itens.',
    ],
    'boolean' => ':attribute deve ser true ou false.',
    'confirmed' => 'A confirmação de senha não é válida.',
    'date' => ':attribute não é uma data valida.',
    'date_equals' => ':attribute deve ser uma data igual a :date.',
    'date_format' => ':attribute não é uma data valida.',
    'different' => ':attribute e :other devem ser diferentes.',
    'digits' => ':attribute deve ter :digits digitos.',
    'digits_between' => ':attribute deve ter entre :min e :max digitos.',
    'dimensions' => ':attribute tem dimensões inválidas de imagem.',
    'distinct' => 'O campo :attribute tem um valor duplicado.',
    'email' => 'O campo :attribute deve ser um email válido.',
    'ends_with' => 'O campo :attribute deve terminar com um dos valores a seguir: :values',
    'exists' => 'O atributo selecionado :attribute é inválido.',
    'file' => ':attribute deve ser um arquivo.',
    'filled' => 'O campo :attribute é requerido.',
    'gt' => [
        'numeric' => ':attribute deve ser maior que :value.',
        'file' => ':attribute deve ser maior que :value kilobytes.',
        'string' => ':attribute deve ter mais que :value caracteres.',
        'array' => ':attribute deve ter mais que :value itens.',
    ],
    'gte' => [
        'numeric' => ':attribute deve ser maior ou igual a :value.',
        'file' => ':attribute deve ser maior ou igual a :value kilobytes.',
        'string' => ':attribute deve ter :value ou mais caracteres.',
        'array' => ':attribute deve ter :value ou mais itens.',
    ],
    'image' => 'O campo :attribute deve ser uma imagem.',
    'in' => 'O campo :attribute selecionado é inválido.',
    'in_array' => 'O campo :attribute não existe em :other.',
    'integer' => 'O campo :attribute deve ser um inteiro.',
    'ip' => 'O campo :attribute deve ser um endereço de IP válido.',
    'ipv4' => 'O campo :attribute deve ser um endereço de IPv4 válido.',
    'ipv6' => 'O campo :attribute deve ser um endereço de IPv6 válido.',
    'json' => 'O campo :attribute deve ser uma string JSON válida.',
    'lt' => [
        'numeric' => ':attribute deve ser menor que :value.',
        'file' => ':attribute deve ser menor que :value kilobytes.',
        'string' => ':attribute deve ter menos que :value caracteres.',
        'array' => ':attribute deve ter menos que :value itens.',
    ],
    'lte' => [
        'numeric' => ':attribute deve ser menor ou igual a :value.',
        'file' => ':attribute deve ser menor ou igual a :value kilobytes.',
        'string' => ':attribute não pode ter mais que :value caracteres.',
        'array' => ':attribute não pode ter mais que :value itens.',
    ],
    'max' => [
        'numeric' => ':attribute não pode ser maior que :max.',
        'file' => ':attribute não pode ser maior que :max kilobytes.',
        'string' => ':attribute não pode ter mais que :max caracteres.',
        'array' => ':attribute não pode ter mais que :max itens.',
    ],
    'mimes' => 'O campo :attribute deve ser um arquivo do tipo: :values.',
    'mimetypes' => 'O campo :attribute deve ser um arquivo do tipo: :values.',
    'min' => [
        'numeric' => ':attribute deve ser no mínimo :min.',
        'file' => ':attribute deve ter no mínimo :min kilobytes.',
        'string' => ':attribute deve ter no mínimo :min caracteres.',
        'array' => ':attribute deve ter no mínimo :min itens.',
    ],
    'not_in' => 'O campo selecionado :attribute é inválido.',
    'not_regex' => 'O formato de :attribute é inválido.',
    'numeric' => 'O campo :attribute deve ser um número.',
    'present' => 'O campo :attribute deve estar presente.',
    'regex' => 'O formato de :attribute é inválido.',
    'required' => 'O campo :attribute é requerido.',
    'required_if' => 'O campo :attribute é requerido quando :other é :value.',
    'required_unless' => 'O campo :attribute é requerido a menos que :other esteja em :values.',
    'required_with' => 'O campo :attribute é requerido quando :values está presente.',
    'required_with_all' => 'O campo :attribute é requerido quando :values está presente.',
    'required_without' => 'O campo :attribute é requerido quando :values não está presente.',
    'required_without_all' => 'O campo :attribute é requerido quando :values não estão presentes.',
    'same' => 'Os campos :attribute e :other devem ser iguais.',
    'size' => [
        'numeric' => ':attribute deve ser :size.',
        'file' => ':attribute deve ter :size kilobytes.',
        'string' => ':attribute deve ter :size caracteres.',
        'array' => ':attribute deve conter :size itens.',
    ],
    'starts_with' => ':attribute deve começar com um dos valores a seguir: :values',
    'string' => ':attribute deve ser uma string.',
    'timezone' => ':attribute deve ser um timezone válido.',
    'unique' => ':attribute já foi cadastrado.',
    'uploaded' => 'falha ao enviar :attribute.',
    'url' => 'O formato de :attribute é inválido.',
    'uuid' => ':attribute deve ser um UUID válido.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],

];
