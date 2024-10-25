<!DOCTYPE html>
<html lang="ptBR">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{  $company }}</title>
</head>

<body class="antialiased" style="font-family: 'Nunito', sans-serif;">
<div style="width: 100%;
        max-width: 600px;
        border: 1px solid #acacac;
        background: #efefef;
        color: #3c3c3c;
        padding: 1rem 1rem;">
    <div style="padding-bottom: 1rem;
            border-bottom: 1px solid #acacac;">
        @yield('heading')
    </div>

    @yield('body')
</div>
</body>

</html>
