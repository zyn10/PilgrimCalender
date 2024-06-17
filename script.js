// Populate the year dropdown with a range of years
function populateYearDropdown(startYear, endYear) {
    const yearSelect = document.getElementById('year');
    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Create color palette options
function createColorPalette() {
    const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#392F5A'];
    const paletteContainer = document.getElementById('color-palette');

    colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color-option');
        colorDiv.style.backgroundColor = color;
        colorDiv.onclick = () => selectColor(colorDiv);
        paletteContainer.appendChild(colorDiv);
    });
}

// Select color for the calendar
function selectColor(element) {
    const previouslySelected = document.querySelector('.color-option.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    element.classList.add('selected');
}

// Generate the Islamic calendar for the selected year and color
function generateCalendar() {
    const companyName = document.getElementById('company').value;
    const year = document.getElementById('year').value;
    const selectedColor = document.querySelector('.color-option.selected');

    if (!companyName || !year || !selectedColor) {
        alert('Please enter company name, select year, and choose a color.');
        return;
    }

    const color = selectedColor.style.backgroundColor;
    document.getElementById('companyName').innerText = `${companyName} - Islamic Calendar for ${year}`;
    document.getElementById('calendar').innerHTML = '';

    // Moment-Hijri initialization for the start of the Islamic year
    const islamicDate = moment().year(parseInt(year, 10)).startOf('iYear');

    // Array of Islamic month names
    const islamicMonths = [
        'Muharram', 'Safar', 'Rabiʿ al-Awwal', 'Rabiʿ al-Thani',
        'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaʿban',
        'Ramadan', 'Shawwal', 'Dhu al-Qaʿdah', 'Dhu al-Hijjah'
    ];

    for (let i = 0; i < 12; i++) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        monthDiv.style.backgroundColor = color;

        const monthTitle = document.createElement('h2');
        monthTitle.innerText = islamicMonths[i];
        monthDiv.appendChild(monthTitle);

        const daysDiv = document.createElement('div');
        daysDiv.classList.add('days');

        // Set islamicDate to the first day of the current Islamic month
        islamicDate.iMonth(i).date(1); // Corrected to `date(1)` for setting the day of the month

        // Get the start day of the week for the first day of the month
        const startDayOfWeek = islamicDate.day();

        // Create empty day placeholders for days before the start of the month
        for (let j = 0; j < startDayOfWeek; j++) {
            const emptyDayDiv = document.createElement('div');
            emptyDayDiv.classList.add('day');
            daysDiv.appendChild(emptyDayDiv);
        }

        // Get number of days in the Islamic month
        const daysInMonth = islamicDate.iDaysInMonth();

        // Create day elements for each day in the Islamic month
        for (let j = 1; j <= daysInMonth; j++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.innerText = j;
            daysDiv.appendChild(dayDiv);
        }

        monthDiv.appendChild(daysDiv);
        document.getElementById('calendar').appendChild(monthDiv);
    }

    document.getElementById('downloadBtn').style.display = 'block';
}

// Download the calendar as a PDF
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');

    const calendar = document.getElementById('calendar');
    const pages = calendar.querySelectorAll('.month');
    const title = document.getElementById('companyName').innerText;

    doc.text(title, 40, 40);

    let yOffset = 60;
    for (const page of pages) {
        if (yOffset > 700) {
            doc.addPage();
            yOffset = 40;
        }

        doc.text(page.querySelector('h2').innerText, 40, yOffset);
        yOffset += 20;

        const days = page.querySelectorAll('.day');
        let xOffset = 40;
        for (let i = 0; i < days.length; i++) {
            if (i % 7 === 0) {
                yOffset += 20;
                xOffset = 40;
            }

            doc.text(days[i].innerText, xOffset, yOffset);
            xOffset += 40;
        }
        yOffset += 40;
    }

    doc.save('calendar.pdf');
}

// Call the function to populate the year dropdown and create color palette
populateYearDropdown(1442, 1462); // Islamic years for 2021-2042
createColorPalette();

// Event listeners
document.getElementById('generateBtn').addEventListener('click', generateCalendar);
document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
