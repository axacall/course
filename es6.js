		class Course{
			constructor(names){
				this.id = Math.floor(Math.random()*1000000)
				this.names = names
			}
			
		}
		class UI{
		//-----------------------------------
		temizle(){
			document.querySelector("#name").value = ""
		}

		//-----------------------------------
		sil(sil){
			sil.parentElement.remove();
			return true;
		}
		//-----------------------------------
		mesajs(mesaj,classname){

			document.querySelector(".mesajlar").innerHTML = `
			<div class="${classname}">${mesaj}</div>
			`;
			
			// swal(classname,mesaj,classname);
			setTimeout(()=>{
				console.log(classname)
				document.querySelector(`.${classname}`).remove()
				
			},3000)
		}
		//-----------------------------------
		
		test(course){
			var kapsa = document.getElementById("kapsa")
		
			var html = 
			`
			<div class="mesajlar"></div>
			<table>
				<tbody>
				<tr id="ekle">
					<td class="list">${course.names.substr(0,65)}</td>
					<td class="sil" data-id="${course.id}">Delete</td>
				</tr>
				</tbody>
			</table>
			`;
			kapsa.innerHTML += html;
			}
		}// UI class end

		class Storage{


			static getCouses(){
				let courses;
				if(localStorage.getItem("courses") === null){
					courses = [];
				}else{
					courses =JSON.parse(localStorage.getItem("courses"));
				}

				return courses;
			}

			static displayCourses(){
				let courses = Storage.getCouses();

				courses.forEach(course=>{
					const ui = new UI()
					ui.test(course)
				})
			}
			static addCourses(course){
				const courses = Storage.getCouses();
				courses.push(course);
				localStorage.setItem("courses",JSON.stringify(courses))
			}

			static deleteCourses(element){
				if(element.classList.contains('sil')){
					const id = element.getAttribute('data-id')
					const courses = Storage.getCouses();
					courses.forEach((cours,ix)=>{
						if(cours.id == id){
							courses.splice(ix,1);
						}
					})

					localStorage.setItem("courses",JSON.stringify(courses));
				}

			}
		}


		//-----------------------------------

		document.addEventListener("DOMContentLoaded",Storage.displayCourses)

		document.getElementById('formSubmit').addEventListener("submit",function(e){
			const ui = new UI();
			
			var names = document.getElementById("name").value
			const course = new Course(names)
			if(course.names == ""){
				ui.mesajs("Formu doldur","error")
			}else{
			ui.test(course);
			Storage.addCourses(course)
			ui.mesajs("Form Eklendi","success");

			ui.temizle();
		}
			e.preventDefault();
		})
			document.getElementById('kapsa').addEventListener('click', function(e){
				const ui = new UI();

			if(e.target.classList.contains('sil')){	
				if(ui.sil(e.target)){
					Storage.deleteCourses(e.target);
					ui.mesajs("Form Silindi","success");
				}
				
				
			}
				
		})
			
			// }


// Swal.fire("mesaj")