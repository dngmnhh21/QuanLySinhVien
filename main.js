var danhSachSinhVien = new DanhSachSinhVien();
var validate = new Validation();
function DomID(id){
    var element = document.getElementById(id);
    return element;
}

function ThemSinhVien(){
    //lấy dữ liệu từ người dùng nhập vào
    var masv = DomID("masv").value;
    var hoten = DomID("hoten").value;
    var cmnd = DomID("cmnd").value;
    var email = DomID("email").value;
    var sdt = DomID("sdt").value;
    var loi = 0;
    //kiểm tra validate
    if(KiemTraDauVaoRong("masv",masv) == true){
        loi++;
    }
    if(KiemTraDauVaoRong("hoten",hoten) == true){
        loi++;
    }
    if(KiemTraDauVaoRong("cmnd",cmnd) == true){
        loi++;
    }
    
    if(validate.KiemTraEmail(email)){
        document.getElementById("email").style.borderColor = "green";  
    }else{
        document.getElementById("email").style.borderColor = "red";  
        loi++;
    }
    
    if(validate.KiemTraSDT(sdt)){
        document.getElementById("sdt").style.borderColor = "green";  
    }else{
        document.getElementById("sdt").style.borderColor = "red";  
        loi++;
    }
    if(loi != 0){
        return;
    }
    //thêm sinh viên 
    var sinhvien = new SinhVien(masv,hoten,email,sdt,cmnd);
    danhSachSinhVien.ThemSinhVien(sinhvien);
    CapNhatDanhSachSV(danhSachSinhVien);
    console.log(danhSachSinhVien)

}



function KiemTraDauVaoRong(ID, value){
    if(validate.KiemTraRong(value) == true){
        DomID(ID).style.borderColor = "red";
        return true;
    }else{
        DomID(ID).style.borderColor = "green";
        return false;
    }
}

function CapNhatDanhSachSV (DanhSachSinhVien){
    var listTableSV = DomID("tbodySinhVien");
    listTableSV.innerHTML = "";
    for(var i = 0; i < DanhSachSinhVien.DSSV.length; i++){
        var sv = danhSachSinhVien.DSSV[i];
        var trSinhVien = document.createElement("tr");
        //tạo các thẻ td và filter dữ liệu sinh viên thứ [i] vào
        var tdCheckBox = document.createElement("td");
        var tdMaSV = TaoTheTD("MaSV", sv.MaSV);
        var tdHoTen = TaoTheTD("HoTen", sv.HoTen);
        var tdCMND = TaoTheTD("CMND", sv.CMND);
        var tdEmail = TaoTheTD("Email", sv.Email);
        var tdSoDT = TaoTheTD("SoDT", sv.SoDT);
        //append các td vào tr
        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdCMND);
        trSinhVien.appendChild(tdEmail);
        trSinhVien.appendChild(tdSoDT);
        //append các tr vào tbodySinhVien
        listTableSV.appendChild(trSinhVien);
        

    }
}

function TaoTheTD (className, value){
    var td = document.createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;
}

function setStorage(){
    //chuyển đổi object mảng danhsachsinhvien thành chuỗi json
    var jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);
    // đem chuỗi json lưu vào storage và đặt tên là DanhSachSV
    localStorage.setItem("DanhSachSV", jsonDanhSachSinhVien);
}

function getStorage(){
    //lấy ra chuỗi json là mảng danhsachsinhvien thông qua tên DanhSachSV
    var jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
    var mangDSSV = JSON.parse(jsonDanhSachSinhVien);
    danhSachSinhVien.DSSV = mangDSSV;
    CapNhatDanhSachSV(danhSachSinhVien);
}