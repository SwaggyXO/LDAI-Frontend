export const accuracyOptions = {
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Questions',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Accuracy',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: 'Accuracy Per Question',
        color: 'rgba(0, 0, 0, 0.6)',
        font: {
            size: 14,
        }
      },
    },
    animation: {
      duration: 2000,
    },
};

export const timeOptions = {
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
        x: {
        title: {
            display: true,
            text: 'Questions',
        },
        },
        y: {
        title: {
            display: true,
            text: 'Time Taken',
        },
        },
    },
    plugins: {
        legend: {
        display: true,
        },
        tooltip: {
        enabled: true,
        },
        title: {
            display: true,
            text: 'Time Taken Per Question',
            color: 'rgba(0, 0, 0, 0.6)',
            font: {
                size: 14,
            }
        },
    },
    animation: {
        duration: 2000,
    },
};

export const responseOptions = {
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Respnose Level',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: 'Response Type Counts',
        color: 'rgba(0, 0, 0, 0.6)',
        font: {
            size: 14,
        }
    },
    },
    animation: {
      duration: 2000,
    },
};