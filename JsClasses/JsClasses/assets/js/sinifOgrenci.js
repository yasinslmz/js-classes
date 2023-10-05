class Ogrenci{
    constructor(Name,Surname,Age){
        this.Name=Name;
        this.Surname=Surname;
        this.Age=Age;
    }
}

class Sinif{
    constructor(Name){
        this.Name=Name;
        this.OgrenciListesi=[];
    }

    addStudent(Ogrenci){
        if(Ogrenci.Name!="" && Ogrenci.Surname!=""){
            this.OgrenciListesi.push(Ogrenci);
            alert(Ogrenci.Name+" Adlı Öğrenci Başarılı Bir Şekilde Eklendi");
        }
        else{
            alert("Öğrenci Ekleme Başarısız. Tekrar Deneyiniz");
        }
    }
    deleteStudent(Ogrenci){
        this.OgrenciListesi=this.OgrenciListesi.filter((ogr)=>ogr!=Ogrenci);
    }
}



// var ogr1=new Ogrenci("Erhan","Kaya",33);
// var ogr2=new Ogrenci("Ahmet","Yüksel",23);
// var ogr3=new Ogrenci("Ayşe","Yavuz",23);

// sinif1.OgrenciListesi.push(ogr1);
// sinif1.OgrenciListesi.push(ogr2);
// sinif1.OgrenciListesi.push(ogr3);

// sinif1.addStudent(ogr1);

let siniflar=[];

//const tableSinif=document.getElementById("sinif");
const tableOgrenciler=document.getElementById("ogrenciler");
const secilenSiniflar=document.getElementById("siniflar");

function updateTable(secilenSinif){
    tableOgrenciler.innerHTML="";
    var ss;
    if(secilenSinif!=""){
        ss=siniflar.find((item)=> item.Name===secilenSinif);
    }
    else{
        ss=siniflar.find((item)=> item.Name===secilenSiniflar.value);
    }

    //tableSinif.innerHTML=sinif.Name;
    var tableData="";
    ss.OgrenciListesi.forEach(function(ogr){
        //tableData+=`<tr><td>${ogr.Name}</td><td>${ogr.Surname}</td><td>${ogr.Age}</td><td><button class="btn btn-danger btn-sm">Delete</button></td></tr>`;
    
        const tr=document.createElement("tr");

        const nameTd=document.createElement("td");
        nameTd.textContent=ogr.Name;
        const surnameTd=document.createElement("td");
        surnameTd.textContent=ogr.Surname;
        const ageTd=document.createElement("td");
        ageTd.textContent=ogr.Age;

        const deleteBtnTd=document.createElement("td");
        
        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.className="btn btn-danger btn-sm";

        deleteBtn.addEventListener("click",()=>{
            deleteS(ss.Name,ogr);
        })

        deleteBtnTd.appendChild(deleteBtn)

        tr.appendChild(nameTd);
        tr.appendChild(surnameTd);
        tr.appendChild(ageTd);
        tr.appendChild(deleteBtnTd);

        tableOgrenciler.appendChild(tr);

    })
    //tableOgrenciler.innerHTML=tableData;
}
document.getElementById("addStudent").addEventListener("click",()=>{
    const name=document.getElementById("Name").value;
    const surname=document.getElementById("Surname").value;
    const age=document.getElementById("Age").value;

    let newStudent=new Ogrenci(name,surname,age);
    var ss=siniflar.find((item)=> item.Name===secilenSiniflar.value);

    ss.addStudent(newStudent);
    updateTable(secilenSiniflar.value);
})

function deleteS(ClassName,Ogrenci){
    const selectClass=siniflar.find((sinifBul)=>sinifBul.Name===ClassName);
    selectClass.deleteStudent(Ogrenci);
    updateTable(secilenSiniflar.value);
}


secilenSiniflar.addEventListener("change",(item)=>{
    updateTable(item.target.value);
})

document.getElementById("addClass").addEventListener("click",()=>{
    const newClassName=document.getElementById("ClassName").value;
    let newClass=new Sinif(newClassName);
    siniflar.push(newClass);
    updateClass();
})

function updateClass(){
    let seletOption=document.getElementById("siniflar");
    seletOption.innerHTML="";

    siniflar.forEach((item)=>{
        let option=document.createElement("option");
        option.textContent=item.Name;
        option.value=item.Name

        seletOption.appendChild(option);
    })
}
updateClass();