@extends('mail.template')

@section('heading')
    <h4 style="display:block;margin:auto;width:100%;text-align:center;">Suporte - SITE</h4>
@endsection

@section('body')
    <div>
        <p><b>Nome: </b> {{ $name }}</p>
        <p><b>Email: </b> {{ $email }}</p>
        <p><b>Whatsapp: </b> {{ $whatsapp }}</p>
        <p><b>Mensagem: </b> <br/>{{$userMessage}}</p>
        <br/>
        <br/>
        <span>E-mail gerado de forma automática, por gentileza, não o
                responda.<br/><b>Atenciosamente, Equipe {{ $company }}.</b></span>
    </div>
@endsection
