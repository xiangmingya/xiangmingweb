// document.addEventListener('DOMContentLoaded', function() {
//     function getIPInfo() {
//         // 使用fetch API发送请求到IP查询服务
//         fetch('https://2024.ipchaxun.com/')
//             .then(response => response.json())
//             .then(data => {
//                 if (data.ret === 'ok') {
//                     // 获取省份和城市信息
//                     var province = data.data[1];
//                     var city = data.data[2];
//                     // 更新欢迎信息
//                     document.querySelector('.subheading').textContent = `欢迎来自：${province}${city}的朋友！`;
//                 } else {
//                     // 如果获取IP信息失败，显示默认信息
//                     document.querySelector('.subheading').textContent = `欢迎来自：未知地区的朋友！`;
//                 }
//             })
//             .catch(error => {
//                 // 如果请求失败，显示错误信息
//                 console.error('Error fetching IP info:', error);
//                 document.querySelector('.subheading').textContent = `欢迎来自：无法获取地区信息的朋友！`;
//             });
//     }

//     // 页面加载完成后获取IP信息
//     getIPInfo();
// });
document.addEventListener('DOMContentLoaded', function() {
    function getIPInfo() {
        // 检查localStorage中是否已经有缓存的IP信息
        var cachedIP = localStorage.getItem('cachedIP');
        var cachedLocation = localStorage.getItem('cachedLocation');

        if (cachedIP) {
            // 如果有缓存的IP信息，直接使用缓存的信息
            document.querySelector('.subheading').textContent = cachedLocation;
        } else {
            // 使用fetch API发送请求到IP查询服务
            fetch('https://2024.ipchaxun.com/')
                .then(response => response.json())
                .then(data => {
                    if (data.ret === 'ok') {
                        // 获取省份和城市信息
                        var province = data.data[1];
                        var city = data.data[2];
                        // 更新欢迎信息
                        var welcomeMessage = `欢迎来自：${province}${city}的朋友！`;
                        document.querySelector('.subheading').textContent = welcomeMessage;

                        // 缓存IP信息和欢迎信息
                        localStorage.setItem('cachedIP', data.ip);
                        localStorage.setItem('cachedLocation', welcomeMessage);
                    } else {
                        // 如果获取IP信息失败，显示默认信息
                        document.querySelector('.subheading').textContent = `欢迎来自：未知地区的朋友！`;
                    }
                })
                .catch(error => {
                    // 如果请求失败，尝试使用缓存的信息
                    var cachedLocation = localStorage.getItem('cachedLocation');
                    if (cachedLocation) {
                        document.querySelector('.subheading').textContent = cachedLocation;
                    } else {
                        console.error('Error fetching IP info:', error);
                        document.querySelector('.subheading').textContent = `欢迎来自：无法获取地区信息的朋友！`;
                    }
                });
        }
    }

    // 页面加载完成后获取IP信息
    getIPInfo();
});
