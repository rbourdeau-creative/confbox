<?php

$app->get('/', 'App\Controllers\FrontController:home')->setName('home');
$app->get('/{name:[a-z]+}', 'App\Controllers\FrontController:show')->setName('show');

// Page not found handler
$container['notFoundHandler'] = function ($container) {
    return function (
        Psr\Http\Message\RequestInterface $request,
        Psr\Http\Message\ResponseInterface $response,
        Slim\Exception\NotFoundException $exception = null
    ) use ($container) {
        return $container->view->render(
            $response->withStatus(404),
            'errors/not-found.twig'
        );
    };
};
