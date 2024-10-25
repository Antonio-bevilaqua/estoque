FROM php:8.3

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nano \
    sudo

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure zip

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd simplexml zip

RUN pecl install redis && docker-php-ext-enable redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/axs_cre
RUN mkdir -p vendor

COPY . .

CMD bash -c "composer install && php artisan storage:link && php artisan serve --host=0.0.0.0 --port=11000"
