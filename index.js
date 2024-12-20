const http = require('http');

// Функция для сложения двух чисел
function add(a, b) {
    return a + b;
}

// Создаем сервер
let server;

// Функция для запуска сервера
async function startServer(port = 3000) {
    return new Promise((resolve, reject) => {
        // Создание HTTP сервера
        server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');

            // Обработка маршрута /add
            if (req.url.startsWith('/add') && req.method === 'GET') {
                const urlParams = new URLSearchParams(req.url.slice(5)); // Получаем параметры после "/add?"
                const a = parseInt(urlParams.get('a'));
                const b = parseInt(urlParams.get('b'));

                if (isNaN(a) || isNaN(b)) {
                    res.statusCode = 400;
                    res.end('Invalid parameters');
                } else {
                    res.end(`Result of ${a} + ${b} = ${add(a, b)}`);
                }
            } else {
                res.end('Hello, World!');
            }
        });

        // Слушаем на указанном порту
        server.listen(port, (err) => {
            if (err) {
                console.error('Error starting server:', err);
                reject(err);
            } else {
                console.log(`Server running at http://localhost:${port}/`);
                resolve();
            }
        });

        // Обработка ошибок сервера
        server.on('error', (err) => {
            console.error('Server error:', err);
            reject(err);
        });
    });
}

// Функция для остановки сервера
function stopServer() {
    return new Promise((resolve, reject) => {
        if (server) {
            server.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        } else {
            resolve();  // Если сервер не был запущен, сразу завершаем
        }
    });
}

// Запуск сервера при старте приложения
if (require.main === module) {
    startServer(3000).catch(err => {
        console.error('Failed to start server:', err);
        process.exit(1);  // Завершаем процесс с кодом ошибки
    });
}

// Экпортируем функции для использования в других модулях
module.exports = { add, startServer, stopServer };
