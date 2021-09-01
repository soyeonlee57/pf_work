console.log("loading")
$(document).ready(function () {

	$(function () {
    $('body').niceScroll({scrollspeed:10});
  });


	new fullpage('#fullpage', {
		anchors: ['section1', 'section2', 'section3', 'section4','section5','section6'],
		menu: ".menu .menu_header , .utils .menu_right"
	});
	/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

	const elts = {
		text1: document.getElementById("text1"),
		text2: document.getElementById("text2")
	};

	// The strings to morph between. You can change these to anything you want!
	const texts = [
		"Hi",
		"my",
		"name",
		"is",
		"soyeon"
	];

	// Controls the speed of morphing.
	const morphTime = 1;
	const cooldownTime = 0.25;

	let textIndex = texts.length - 1;
	let time = new Date();
	let morph = 0;
	let cooldown = cooldownTime;

	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];

	function doMorph() {
		morph -= cooldown;
		cooldown = 0;

		let fraction = morph / morphTime;

		if (fraction > 1) {
			cooldown = cooldownTime;
			fraction = 1;
		}

		setMorph(fraction);
	}

	// A lot of the magic happens here, this is what applies the blur filter to the text.
	function setMorph(fraction) {
		// fraction = Math.cos(fraction * Math.PI) / -2 + .5;

		elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
		elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

		fraction = 1 - fraction;
		elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
		elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

		elts.text1.textContent = texts[textIndex % texts.length];
		elts.text2.textContent = texts[(textIndex + 1) % texts.length];
	}

	function doCooldown() {
		morph = 0;

		elts.text2.style.filter = "";
		elts.text2.style.opacity = "100%";

		elts.text1.style.filter = "";
		elts.text1.style.opacity = "0%";
	}

	// Animation loop, which is called every frame.
	function animate() {
		requestAnimationFrame(animate);

		let newTime = new Date();
		let shouldIncrementIndex = cooldown > 0;
		let dt = (newTime - time) / 1000;
		time = newTime;

		cooldown -= dt;

		if (cooldown <= 0) {
			if (shouldIncrementIndex) {
				textIndex++;
			}

			doMorph();
		} else {
			doCooldown();
		}
	}

	// Start the animation.
	animate();

	// slider
	function SliderBox1__init() {
		const swiper = new Swiper(".pf-list > .swiper-container", {
			slidesPerView: 1.5,
			spaceBetween: 30,
		});

	}

	SliderBox1__init();

	function sendEmailForm(form) {
		if ( form._replyto.value.length == 0 ) {
			alert('이메일 주소를 입력해주세요.');
			form._replyto.focus();
			return;
		}
		
		if ( form.message.value.length == 0 ) {
			alert('메세지를 입력해주세요.');
			form.message.focus();
			return;
		}
		
		form.submit();
		
		form._replyto.value = '';
		form.message.value = '';
		form.submit1.innerHTML = '전송되었습니다.';
		form.submit1.disabled = true;
	}

});