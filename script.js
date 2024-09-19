document.addEventListener('DOMContentLoaded', function() {
    // Show splash screen for 5 seconds, then transition to input dialogs
    setTimeout(function() {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('dialogContainer').style.display = 'block';
    }, 5000);

    // Handle Company Name Submission
    document.getElementById('companySubmitBtn').addEventListener('click', function() {
        document.getElementById('companyName').textContent = document.getElementById('company').value;
        transitionDialog('companyDialog', 'yearDialog');
    });

    // Handle Year Selection Submission
    document.getElementById('yearSubmitBtn').addEventListener('click', function() {
        transitionDialog('yearDialog', 'colorDialog');
    });

    // Show next dialog with smooth transition
    function transitionDialog(currentDialogId, nextDialogId) {
        document.getElementById(currentDialogId).style.display = 'none';
        document.getElementById(nextDialogId).style.display = 'block';
    }

    // Handle Generate Calendar Button
    document.getElementById('generateBtn').addEventListener('click', function() {
        // Implement your calendar generation logic here
        document.getElementById('dialogContainer').style.display = 'none';
        document.getElementById('calendarContainer').style.display = 'block';
    });

    // Handle Download PDF Button
    document.getElementById('downloadBtn').addEventListener('click', function() {
        // Implement your PDF download logic here
    });
});
