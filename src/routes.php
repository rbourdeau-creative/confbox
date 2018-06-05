<?php

$app->get('/', 'App\Controllers\PagesController:home')->setName('home');
$app->get('/{name:[a-z]+}', 'App\Controllers\PagesController:show')->setName('show');

$app->map(['GET', 'POST'], '/utilisateurs/s-inscrire', 'App\Controllers\UsersController:edit')->setName('editUser');

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
