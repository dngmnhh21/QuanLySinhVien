var danhSachSinhVien = new DanhSachSinhVien();

getStorage();

var validate = new Validation();

//bổ sung thuộc tính
SinhVien.prototype.DiemToan = '';
SinhVien.prototype.DiemLy = '';
SinhVien.prototype.DiemHoa = '';
SinhVien.prototype.DTB = '';
SinhVien.prototype.Loai = '';

//thêm phương thức
SinhVien.prototype.TinhDTB = function(){
    this.DTB = (Number(this.DiemToan) + Number(this.DiemLy)+ Number(this.DiemHoa))/3;
}
SinhVien.prototype.XepLoai =  function(){
    if(this.DTB <= 10 && this.DTB >= 8){
        this.Loai = "Xếp loại giỏi";
    }else if(this.DTB < 8 && this.DTB >= 6.5){
        this.Loai = "Xếp loại khá";
    }else if(this.DTB < 6.5 && this.DTB >= 5){
        this.Loai = "Xếp loại trung bình";
    }else{
        this.Loai = "Xếp loại yếu";
    }

}


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
    sinhvien.DiemToan = DomID("toan").value;
    sinhvien.DiemLy = DomID("ly").value;
    sinhvien.DiemHoa = DomID("hoa").value;
    sinhvien.TinhDTB();
    sinhvien.XepLoai();
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
        trSinhVien.id = sv.MaSV;
        trSinhVien.className = "trSinhVien";
        trSinhVien.setAttribute("onclick","ChinhSuaSinhvien('"+sv.MaSV+"')");
        //tạo các thẻ td và filter dữ liệu sinh viên thứ [i] vào
        var tdCheckBox = document.createElement("td");
        var ckbMaSinhVien =document.createElement("input");
        console.log(ckbMaSinhVien);
        ckbMaSinhVien.setAttribute("class", "ckbMaSV");
        ckbMaSinhVien.setAttribute("type", "checkbox");
        ckbMaSinhVien.setAttribute("value",sv.MaSV);
        tdCheckBox.appendChild(ckbMaSinhVien);

        var tdMaSV = TaoTheTD("MaSV", sv.MaSV);
        var tdHoTen = TaoTheTD("HoTen", sv.HoTen);
        var tdCMND = TaoTheTD("CMND", sv.CMND);
        var tdEmail = TaoTheTD("Email", sv.Email);
        var tdSoDT = TaoTheTD("SoDT", sv.SoDT);

        //tạo td DTB và xếp loại
        var tdDTB = TaoTheTD("DTB", sv.DTB);
        var tdXepLoai = TaoTheTD("XepLoai", sv.Loai);


        //append các td vào tr
        
        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdCMND);
        trSinhVien.appendChild(tdEmail);
        trSinhVien.appendChild(tdSoDT);
        trSinhVien.appendChild(tdDTB);
        trSinhVien.appendChild(tdXepLoai);
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

//xoa sinh vien
function XoaSinhVien(){
    //mang checkbox
    var listMaSV = document.getElementsByClassName("ckbMaSV");
    //mang ma sv dc chon 
    var listMaSVDuocChon = [];
    for(i =0 ; i<listMaSV.length;i++){
        console.log(listMaSV[i]);
        if(listMaSV[i].checked){ // kiem tra phan tu checkbox co dc chon hay chua
            listMaSVDuocChon.push(listMaSV[i].value);
        }
    }
    danhSachSinhVien.XoaSinhVien(listMaSVDuocChon);
    CapNhatDanhSachSV(danhSachSinhVien);
}


function TimKiemSinhVien(){
    var tukhoa = DomID("tukhoa").value;
    var listDSSVTimKiem = danhSachSinhVien.TimKiemSinhVien(tukhoa);
    CapNhatDanhSachSV(listDSSVTimKiem);

}

function ChinhSuaSinhvien(masv){
    var sinhvien = danhSachSinhVien.TimSVTheoMa(masv);
    if(sinhvien != null){
        DomID("masv").value = sinhvien.MaSV;
        DomID("hoten").value = sinhvien.HoTen;
        DomID("cmnd").value = sinhvien.CMND;
        DomID("email").value = sinhvien.Email;
        DomID("sdt").value = sinhvien.SoDT;
    
    }

}

function LuuThongTin(){
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
    danhSachSinhVien.SuaSinhVien(sinhvien);
    CapNhatDanhSachSV(danhSachSinhVien);
    

}