(function () {
    'use strict';

    // 默认配置
    const defaultConfig = {
        width: '400px',
        height: '600px',
        position: 'bottom-right', // bottom-right, bottom-left, center
        theme: 'light',
        showButton: true,
        buttonText: '💬',
        zIndex: 9999
    };

    class ChatWidget {
        constructor(options = {}) {
            this.config = { ...defaultConfig, ...options };
            this.isOpen = false;
            this.baseUrl = options.baseUrl || window.location.origin;
            this.init();
        }

        init() {
            this.createStyles();
            if (this.config.showButton) {
                this.createButton();
            }
            this.createIframe();
        }

        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
        .chat-widget-container {
          position: fixed;
          z-index: ${this.config.zIndex};
          transition: all 0.3s ease-in-out;
        }
        
        .chat-widget-button {
          position: fixed;
          z-index: ${this.config.zIndex + 1};
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }
        
        .chat-widget-button:hover {
          background: #0056b3;
          transform: scale(1.1);
        }
        
        .chat-widget-iframe {
          border: none;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          background: white;
        }
        
        .chat-widget-hidden {
          opacity: 0;
          visibility: hidden;
          transform: scale(0.8);
        }
        
        .chat-widget-visible {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }
      `;
            document.head.appendChild(style);
        }

        createButton() {
            this.button = document.createElement('button');
            this.button.className = 'chat-widget-button';
            this.button.innerHTML = this.config.buttonText;
            this.button.onclick = () => this.toggle();

            this.positionButton();
            document.body.appendChild(this.button);
        }

        createIframe() {
            this.container = document.createElement('div');
            this.container.className = 'chat-widget-container chat-widget-hidden';

            this.iframe = document.createElement('iframe');
            this.iframe.className = 'chat-widget-iframe';
            this.iframe.src = `${this.baseUrl}/embed`;
            this.iframe.width = this.config.width;
            this.iframe.height = this.config.height;
            this.iframe.allow = 'clipboard-write';

            this.container.appendChild(this.iframe);
            this.positionContainer();
            document.body.appendChild(this.container);
        }

        positionButton() {
            const position = this.config.position;
            if (position === 'bottom-right') {
                this.button.style.bottom = '20px';
                this.button.style.right = '20px';
            } else if (position === 'bottom-left') {
                this.button.style.bottom = '20px';
                this.button.style.left = '20px';
            }
        }

        positionContainer() {
            const position = this.config.position;
            if (position === 'bottom-right') {
                this.container.style.bottom = this.config.showButton ? '90px' : '20px';
                this.container.style.right = '20px';
            } else if (position === 'bottom-left') {
                this.container.style.bottom = this.config.showButton ? '90px' : '20px';
                this.container.style.left = '20px';
            } else if (position === 'center') {
                this.container.style.top = '50%';
                this.container.style.left = '50%';
                this.container.style.transform = 'translate(-50%, -50%)';
            }
        }

        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

        open() {
            this.container.classList.remove('chat-widget-hidden');
            this.container.classList.add('chat-widget-visible');
            this.isOpen = true;
        }

        close() {
            this.container.classList.remove('chat-widget-visible');
            this.container.classList.add('chat-widget-hidden');
            this.isOpen = false;
        }

        destroy() {
            if (this.button) this.button.remove();
            if (this.container) this.container.remove();
        }
    }

    // 全局API
    window.ChatWidget = ChatWidget;

    // 自动初始化（如果配置了自动加载）
    if (window.chatWidgetConfig && window.chatWidgetConfig.autoLoad !== false) {
        window.chatWidget = new ChatWidget(window.chatWidgetConfig);
    }
})(); 
