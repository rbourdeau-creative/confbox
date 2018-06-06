<?php

namespace App\Controllers;

use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

class UsersController extends Controller{

    public function edit(RequestInterface $request, ResponseInterface $response){
        if($request->getMethod() === "GET"){
            return $this->render($response, 'users/edit.twig');
        }elseif ($request->getMethod() === "POST") {
            $data = $request->getParsedBody();
            echo "<pre>";
            print_r($data);
            echo "</pre>";
            return true;
        }else{
            return $response->withRedirect('/404NotFound');
        }
    }

    public function login(RequestInterface $request, ResponseInterface $response){
        if($request->getMethod() === "GET"){
            return $this->render($response, 'users/login.twig');
        }elseif ($request->getMethod() === "POST") {
            $data = $request->getParsedBody();
            echo "<pre>";
            print_r($data);
            echo "</pre>";
            return true;
        }else{
            return $response->withRedirect('/404NotFound');
        }
    }

    public function forgottenPassword(RequestInterface $request, ResponseInterface $response){
        if($request->getMethod() === "GET"){
            return $this->render($response, 'users/forgotten-password.twig');
        }elseif ($request->getMethod() === "POST") {
            $data = $request->getParsedBody();
            echo "<pre>";
            print_r($data);
            echo "</pre>";
            return true;
        }else{
            return $response->withRedirect('/404NotFound');
        }
    }
}
