function Validation(){
    this.KiemTraRong = function(value){
        if(value.trim() === ''){
            return true;
        }
        return false;
    }
    this.KiemTraEmail = function(value){
        var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexEmail.test(value.trim());
    }
    this.KiemTraSDT = function(value){
        var regexNum = /^[0-9]+$/;
        if(regexNum.test(value) && value.length >=10){
            return true;
        }
        return false;
    }
}