<?php
require_once dirname(__DIR__) . '/vendor/autoload.php';
use Workerman\Worker;
use Channel\Client;

$inner_worker = new Worker("text://127.0.0.1:1234");
$inner_worker->onWorkerStart = function() {
    Client::connect('127.0.0.1', 2206);
};

$inner_worker->onMessage = function($connection, $buffer) {
    $data = json_decode($buffer, true);
    // Push the message to the Channel Server
    Client::publish('send_notification', $data);
};

Worker::runAll();