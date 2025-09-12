/**
 * Video.js Plugin: disableSeek
 * Ngăn người dùng tua video về phía trước
 * Viết lại theo phong cách plugin chuẩn, tham khảo videojs-markers
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    console.log("function");
    define(['video.js'], factory);
  } else if (typeof exports === 'object' && typeof module === 'object') {
    // CommonJS
    console.log("CommonJS");
    module.exports = factory(require('video.js'));
  } else if (typeof window !== 'undefined' && window.videojs) {
    // Browser globals
    console.log("Browser globals");
    factory(window.videojs);
  }
}(function (videojs) {
  console.log("Video disable seek");
  if (!videojs) {
    console.error('[disableSeek] video.js not found!');
    return;
  }
    const Plugin = videojs.getPlugin ? videojs.getPlugin('plugin') : videojs.Plugin;
    console.log("Plugin", Plugin)

class DisableSeekPlugin extends Plugin {
    constructor(player, options) {
        super(player, options);
        this.options = videojs.mergeOptions({
            threshold: 0.5 // cho phép chênh lệch nhẹ
        }, options);

        this.lastTime = 0;

        // Cập nhật lastTime khi video đang phát bình thường
        player.on('timeupdate', () => {
            if (!player.seeking()) {
            this.lastTime = player.currentTime();
            }
        });

        // Ngăn seek
        player.on('seeking', () => {
            const current = player.currentTime();
            const diff = current - this.lastTime;
            if (Math.abs(diff) > this.options.threshold) {
            player.currentTime(this.lastTime);
            }
        });

        // Optional: reset lastTime khi play lại từ đầu
        player.on('play', () => {
            if (player.currentTime() < this.lastTime) {
            this.lastTime = player.currentTime();
            }
        });
    }
  }

  // Đăng ký plugin
  videojs.registerPlugin('disableSeek', function(options) {
    return new DisableSeekPlugin(this, options);
  });

  console.log('[Plugin] disableSeek registered successfully');
}));
