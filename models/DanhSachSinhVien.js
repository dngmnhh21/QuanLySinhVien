function DanhSachSinhVien (){
    this.DSSV = [];
    this.ThemSinhVien = function(svThem){
        this.DSSV.push(svThem);
    }
    this.XoaSinhVien = function(listSVXoa){
        for(var i=0;i<listSVXoa.length;i++){
            for(var j=0; j<this.DSSV.length;j++){
                var sinhvien = this.DSSV[j];
                if(listSVXoa[i] == sinhvien.MaSV){
                    this.DSSV.splice(j,1);
                }
            }
        }

    }
    this.SuaSinhVien = function(svCapNhat){
        for(var i = 0 ; i< this.DSSV.length; i++){
            var svUpdate = this.DSSV[i];
            if(svCapNhat.MaSV == svUpdate.MaSV){
                svUpdate.HoTen = svCapNhat.HoTen;
                svUpdate.Email = svCapNhat.Email;
                svUpdate.CMND = svCapNhat.CMND;
                svUpdate.SoDT = svCapNhat.SoDT;
                
            }
        }

    }
    this.TimKiemSinhVien = function(tuKhoa){
        var listKetQuaTimKiem = new DanhSachSinhVien();
        for(var i = 0 ; i<this.DSSV.length; i++){
            var sinhvien = this.DSSV[i];
            if(sinhvien.HoTen.toLowerCase().trim().search(tuKhoa.toLowerCase().trim()) != -1){
                listKetQuaTimKiem.ThemSinhVien(sinhvien);
            }
        }
        return listKetQuaTimKiem;

    }
    this.TimSVTheoMa = function(masv){
        for(var i = 0 ; i< this.DSSV.length; i++){
            var sv = this.DSSV[i];
            if(sv.MaSV == masv){
                return sv;
            }
        }
        return null;
    }
}