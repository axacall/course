		
		// form onsubmit="return false;">
		
		function Course(names){
			this.names = names
		}

		function UI(){

		}

		var ui = new UI();

		UI.prototype.temizle = function(){
			document.querySelector("#name").value = ""
		}
		

		UI.prototype.sil = function(sil){
			sil.parentElement.remove();
			if(sil){				
				ui.mesajs("Form Silindi","success");
			}else{
				ui.mesajs("Form Silinmedi","error")
			}
			
		}

		UI.prototype.mesajs = function(mesaj,classname){

			document.querySelector(".mesajlar").innerHTML = `
			<div class="${classname}">${mesaj}</div>
			`;
				
			// swal(classname,mesaj,classname);
			setTimeout(()=>{
				document.querySelector(`.${classname}`).remove()
				
			},3000)
		}

		document.querySelector(".sil").addEventListener("click",function(e){
			ui.sil(e.target)

		})


		document.getElementById("formSubmit").addEventListener("submit",function(e){
			var names = document.querySelector("#name").value

			const course = new Course(names)
			ui.test(course);

			e.preventDefault();

		})

			UI.prototype.test = function(course){
				
			var ekle = document.querySelector(".ekle")

			if(course.names == ""){
				ui.mesajs("Formu doldur","error")
			}else{
			var html = 
			`
			<div class="list">${course.names}<span class="sil"> #sil</span></div>
			`
			ekle.innerHTML += html;

			ui.temizle()
			ui.mesajs("Form Eklendi","success")
			}

		}
// Swal.fire("mesaj")