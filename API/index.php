<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getContasP()
{
    $json = file_get_contents(__DIR__ . '/contasp.json');
    $data = json_decode($json, true);
    return $data['contasP'];
}

function getContasR()
{
    $json = file_get_contents(__DIR__ . '/contasr.json');
    $data = json_decode($json, true);
    return $data['contasR'];
}

function findIndexByIdP($id)
{
    $bills = getContasP();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function findIndexByIdR($id)
{
    $bills = getContasR();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills, $tipo)
{
    if ($tipo == 'p') {
        $data = ['contasP' => $bills];
        $json = json_encode($data);
        file_put_contents(__DIR__ . '/contasp.json', $json);
    }else{
        $data = ['contasR' => $bills];
        $json = json_encode($data);
        file_put_contents(__DIR__ . '/contasr.json', $json);
    }
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/contasP', function () use ($app) {
    $contasP = getContasP();
    return $app->json($contasP);
});

$app->get('api/contasR', function () use ($app) {
    $contasR = getContasR();
    return $app->json($contasR);
});

$app->get('api/contas/total', function () use ($app) {
    $contasR = getContasR();
    $sum=0;
    foreach ($contasR as $value) {
        if (!$value['pago']) {
            $sum += (float)$value['valor'];
        }
    }
    $contasP = getContasP();
    foreach ($contasP as $value) {
        if (!$value['pago']) {
            $sum -= (float)$value['valor'];
        }
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/contasP/{id}', function ($id) use ($app) {
    $contas = getContasP();
    $conta = $contas[findIndexByIdP($id)];
    return $app->json($conta);
});

$app->get('api/contasR/{id}', function ($id) use ($app) {
    $contas = getContasR();
    $conta = $contas[findIndexByIdR($id)];
    return $app->json($conta);
});

$app->post('api/contasP', function (Request $request) use ($app) {
    $bills = getContasP();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, 'p');
    return $app->json($data);
});

$app->post('api/contasR', function (Request $request) use ($app) {
    $bills = getContasR();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, 'r');
    return $app->json($data);
});

$app->put('api/contasP/{id}', function (Request $request, $id) use ($app) {
    $bills = getContasP();
    $data = $request->request->all();
    $index = findIndexByIdP($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, 'p');
    return $app->json($bills[$index]);
});

$app->put('api/contasR/{id}', function (Request $request, $id) use ($app) {
    $bills = getContasR();
    $data = $request->request->all();
    $index = findIndexByIdR($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, 'r');
    return $app->json($bills[$index]);
});

$app->delete('api/contasP/{id}', function ($id) {
    $bills = getContasP();
    $index = findIndexByIdP($id);
    array_splice($bills,$index,1);
    writeBills($bills, 'p');
    return new Response("", 204);
});

$app->delete('api/contasR/{id}', function ($id) {
    $bills = getContasR();
    $index = findIndexByIdR($id);
    array_splice($bills,$index,1);
    writeBills($bills, 'r');
    return new Response("", 204);
});

$app->put('api/pagar/{id}', function ($id) use ($app) {
    $bills = getContasP();
    $index = findIndexByIdP($id);
    $bills[$index]['pago'] = !$bills[$index]['pago'];
    writeBills($bills, 'p');
    return $app->json($bills[$index]);
});

$app->put('api/receber/{id}', function ($id) use ($app) {
    $bills = getContasR();
    $index = findIndexByIdR($id);
    $bills[$index]['pago'] = !$bills[$index]['pago'];
    writeBills($bills, 'r');
    return $app->json($bills[$index]);
});

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();
