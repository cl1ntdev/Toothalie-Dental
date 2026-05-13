<?php
require_once dirname(__DIR__) . '/vendor/autoload.php';
use Workerman\Worker;
use Channel\Server;

$channel_server = new Server('127.0.0.1', 2206);
Worker::runAll();