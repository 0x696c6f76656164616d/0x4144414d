document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("passwordInput");
    const goBtn = document.getElementById("goBtn");
    const errorDiv = document.getElementById("errorMessage");
    const hintDiv = document.getElementById("hintText");
    const passwordContainer = document.querySelector(".password-container");
    const themeBtn = document.getElementById("switchButton");

    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseBtn2 = document.getElementById('playPauseBtn2');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeSlider2 = document.getElementById('volumeSlider2');

    audio.volume = 0.3;

    const backgrounds = [
        "forHim/site-graphics/main.png",
        "forHim/site-graphics/pc.png"
    ];
    let currentBgIndex = 0;
    let isTransitioning = false;
    const bgLayer1 = document.getElementById('bgLayer1');
    const bgLayer2 = document.getElementById('bgLayer2');
    bgLayer1.style.backgroundImage = `url('${backgrounds[0]}')`;

    let count = 0;

    let calculator = null;
    let continueButtonCreated = false;

    function handlePasswordSubmit() {
        const password = passwordInput.value.trim();

        if (password !== "290126") {
            passwordInput.value = "";
            count += 1;
            errorDiv.textContent = "Wrong password, try again 💜";
            errorDiv.style.color = "#d32f2f";
            if (count === 3) {
                hintDiv.classList.add("text-style");
                hintDiv.textContent = "Hint: the day you turn 19!!";
            }
            if (count === 5) {
                hintDiv.textContent = "It's 3! digits long :D";
            }
            return;
        }

        errorDiv.textContent = "Good job my love! 💜";
        errorDiv.style.color = "green";
        document.getElementById("hintText").remove();

        const characterImage = document.querySelector(".character-image");
        if (characterImage) {
            characterImage.classList.add("bounce-animation");
            
            setTimeout(() => {
                characterImage.classList.remove("bounce-animation");
            }, 800);
        }

        if (!continueButtonCreated) {
            createContinueButton();
            continueButtonCreated = true;
        }
    }

    function changeBackground() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
        
        const activeLayer = bgLayer1.classList.contains('active') ? bgLayer1 : bgLayer2;
        const inactiveLayer = bgLayer1.classList.contains('active') ? bgLayer2 : bgLayer1;
        
        inactiveLayer.style.backgroundImage = `url('${backgrounds[currentBgIndex]}')`;
        
        activeLayer.classList.add('sliding-out');
        inactiveLayer.classList.add('active');
        
        setTimeout(() => {
            activeLayer.classList.remove('active', 'sliding-out');
            isTransitioning = false;
        }, 800);
    }

    function createContinueButton() {
        const continueButton = document.createElement("button");
        continueButton.className = "buttonStyle";
        continueButton.classList.add("continue");
        continueButton.textContent = "Continue! 💜";

        continueButton.addEventListener("click", () => {
            document.getElementById("passwordScreen").classList.remove("active");
            changeBackground();
            
            setTimeout(() => {
                document.querySelector('.new-mail-div').classList.add('show');
            }, 1000);
            
            document.getElementById("mailImage").addEventListener("click", () => {
                document.getElementById("letterScreen").classList.add("active");
                
                setTimeout(() => {
                    document.querySelector('.letter-container').classList.add('show');
                }, 100);
                
                initializeGraph();
            });
        });

        passwordContainer.appendChild(continueButton);
    }

    function initializeGraph() {
        if (calculator) return;

        const elt = document.getElementById("calculator");
        calculator = Desmos.GraphingCalculator(elt, {
            expressions: true,
            settingsMenu: true
        });

        calculator.setExpression({
            id: "stored-equation",
            latex: "y = x^{2/3} + (1 - 0.1)\\sqrt{29 - x^2}\\sin(26\\pi x)",
            color: "purple"
        });
    }

    passwordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handlePasswordSubmit();
    });

    goBtn.addEventListener("click", handlePasswordSubmit);

    function tryAutoplay() {
        audio.play().catch(() => {
            playPauseBtn.textContent = '▶';
            if (playPauseBtn2) playPauseBtn2.textContent = '▶';
        });
    }

    window.addEventListener('load', tryAutoplay);

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '||';
            if (playPauseBtn2) playPauseBtn2.textContent = '||';
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶';
            if (playPauseBtn2) playPauseBtn2.textContent = '▶';
        }
    }

    playPauseBtn.addEventListener('click', togglePlayPause);
    if (playPauseBtn2) {
        playPauseBtn2.addEventListener('click', togglePlayPause);
    }

    function updateVolume(value) {
        audio.volume = value / 100;
        volumeSlider.value = value;
        if (volumeSlider2) volumeSlider2.value = value;
    }

    volumeSlider.addEventListener('input', (e) => updateVolume(e.target.value));
    if (volumeSlider2) {
        volumeSlider2.addEventListener('input', (e) => updateVolume(e.target.value));
    }

});
