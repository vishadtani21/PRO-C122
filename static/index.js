$(document).ready(function(){

    console.log('Document is Ready')

    let date = new Date()
    let current_date = date.toDateString()

    $('#date').text('Date : ' + current_date)

    let review = ""
    let input_data = ""
    let product = ""
    let emotion = ""
    let emoji_url = ""

    function ajax_request(api_url , input_data){

        $.ajax({
            type : 'POST',
            url : api_url,
            data : JSON.stringify(input_data),
            dataType : 'json',
            contentType : 'application/json',

            success : function(result)
            {
                emotion = result.sentiment
                emoji_url = result.path

                if (product  ==  'Smartphone'){
                    $('#m_emoji').attr('src' , emoji_url)
                    $('#m_emotion').text(emotion)
                    $('#m_emoji').show()
                    $('#m_emotion').show()
                }

                else if (product  ==  'Digital Camera'){
                    $('#c_emoji').attr('src' , emoji_url)
                    $('#c_emotion').text(emotion)
                    $('#c_emoji').show()
                    $('#c_emotion').show()
                }

                else if (product  ==  'Headphones'){
                    $('#h_emoji').attr('src' , emoji_url)
                    $('#h_emotion').text(emotion)
                    $('#h_emoji').show()
                    $('#h_emotion').show()
                }

                else if (product  ==  'Video Games'){
                    $('#v_emoji').attr('src' , emoji_url)
                    $('#v_emotion').text(emotion)
                    $('#v_emoji').show()
                    $('#v_emotion').show()
                }
            },

            error : function(result)
            {
                console.log(result)
            }

        })

        console.log('ajax request sent')
        
    }

    $('#m_button').click(function(){

        review = $('#m_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Smartphone'
    })

    $('#c_button').click(function(){

        review = $('#c_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Digital Camera'
    })

    $('#h_button').click(function(){

        review = $('#h_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Headphones'
    })

    $('#v_button').click(function(){

        review = $('#v_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Video Games'
    })

    $('#save_button').click(function(){

        console.log('save button is clicked')

        input_data = {'date' : date , 'product' : product , 'review' : review , 'sentiment' : emotion}

        $.ajax({
            type : 'POST',
            url : '/save',
            data : JSON.stringify(input_data),
            dataType : 'json',
            contentType : 'application/json',
            success : function(result){
                console.log(result)
            },
            error : function(result){
                console.log(result)
            }
        })

        $('#m_textbox').val('')
        $('#c_textbox').val('')
        $('#h_textbox').val('')
        $('#v_textbox').val('')
    })


    displayBot()

})

function displayBot() {
    $('.chatbox__button').click(function () {
        $('.chatbox__chat').toggle()
    });

    askBot()
}

function askBot() {
    $("#send_button").click(function () {

        var user_bot_input_text = $("#bot_input_text").val()

        if (user_bot_input_text != "") {
           
            $("#chat_messages").append('<div class="user__messages">' + user_bot_input_text + ' </div>')

            $("#bot_input_text").val('');

            let chat_input_data = {
                "user_bot_input_text": user_bot_input_text
            }

            $.ajax({
                type: 'POST',
                url: "/bot-response",
                data: JSON.stringify(chat_input_data),
                dataType: "json",
                contentType: 'application/json',
                    success: function (result) {
                        
                        $("#chat_messages").append('<div class="bot__messages">' + result.bot_response + ' </div>')                        
                        $('.chatbox__messages__cotainer').animate({
                            scrollTop: $('.chatbox__messages__cotainer')[0].scrollHeight}, 1000);
                    },
                    error: function (result) {
                        alert(result.responseJSON.message)
                    }
            });

        }

    })
    $('#bot_input_text').keypress(function(e){
  
        if(e.which == 13){         
            $('#send_button').click(); 
        }
    });
}