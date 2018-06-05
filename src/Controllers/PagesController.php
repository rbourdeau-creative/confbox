<?php

namespace App\Controllers;

use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

class PagesController extends Controller{
    public function home(RequestInterface $request, ResponseInterface $response){
        return $this->render($response, 'pages/home.twig');
    }

    public function show(RequestInterface $request, ResponseInterface $response, $args){
        return $this->render($response, 'pages/show.twig', $args);
    }
}
