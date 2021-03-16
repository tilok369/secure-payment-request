var securePaymentService = {
    validate: function () {
        $('#cardholder-name-vld').text('');
        $('#card-number-vld').text('');
        $('#expiry-date-vld').text('');
        $('#cvv-vld').text('');

        if (!$('#cardholder-name').val()) {
            $('#cardholder-name-vld').text('Please enter card holder name');
            return false;
        }
        if (!$('#card-number').val() || $('#card-number').val().length !== 16) {
            $('#card-number-vld').text('Please enter valid card number with 16 digits');
            return false;
        }
        if (!$('#expiry-date').val() || $('#expiry-date').val().indexOf('/') === -1) {
            $('#expiry-date-vld').text('Please enter valid expiry date with format mm/yy');
            return false;
        }
        if (!$('#cvv').val() || $('#cvv').val().length !== 3) {
            $('#cvv-vld').text('Please enter valid CVV code with 3 digits');
            return false;
        }

        return true;
    },

    submit: function () {
        if (securePaymentService.validate()) {
            var d = new Date();
            var k = d.getFullYear() + '' + (d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()) + '' +
                (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + '' +
                (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + '' +
                (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + '' +
                (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()) + 'XX';
            var cardInfo = {
                Name: cryptoGraphy.encryptDynamic(k, $('#cardholder-name').val()),
                Number: cryptoGraphy.encryptDynamic(k, $('#card-number').val()),
                ExpiryDate: cryptoGraphy.encryptDynamic(k, $('#expiry-date').val()),
                Cvv: cryptoGraphy.encryptDynamic(k, $('#cvv').val()),
                Key: cryptoGraphy.encrypt(k)
            };
            $.ajax({
                type: "POST",
                url: "/payment/initiate",
                data: JSON.stringify(cardInfo),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result) {
                        alert('Payment submitted for processing');
                    } else {
                        alert('Something went wrong, please contact administrator');
                    }
                },
                error: function (xhr, status, exception) {
                    console.log(xhr);
                    console.log("Error: " + exception + ", Status: " + status);
                }
            });
        }
    }
};