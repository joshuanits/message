jQuery(function ($) {
            var socket = io.connect();
            var $nickForm = $('#setNick');
            var $nickError = $('#nickError');
            var $nickBox = $('#nickname');
            var $users = $('#users');
            var $messageForm = $('#send-message');
            var $messageBox = $('#message');
            var $chat = $('#chat');

            $nickForm.submit(function(e){
                e.preventDefault();
                socket.emit('new user', $nickBox.val(), function (data) {
                    if (data) {
                        $('#nickWrap').hide();
                        $('#contentWrap').show();
                    } else {
                        $nickError.html('Lmao pls pick another username, that one is taken.');
                    }
                });
                $nickBox.val('');
            });

            socket.on('usernames', function(data){
                var html = '';
                for (i = 0; i < data.length; i++) {
                    html += data[i] + '<br/>'
                }
                $users.html(html);
            });

            $messageForm.submit(function (e) {
                e.preventDefault();
                socket.emit('send message', $messageBox.val());
                $messageBox.val('');
            });

            socket.on('new message', function (data) {
                var messagee = document.createElement('div');
                messagee.id = 'msg';
                messagee.style.visibility = 'hidden';
                //messagee(whichIsVisible()[0].id);
                messagee.innerHTML = $chat.append('<b>' + data.nick +  ': </b>' + data.msg);
                document.getElementById('chat').appendChild(messagee);
                document.getElementById('chat').scrollTop = messagee.offsetHeight + messagee.offsetTop;
            });
        });
