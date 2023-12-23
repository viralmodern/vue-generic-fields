export default {
  boards: [
    {
      id: 8981,
      title: "Google cloud platform",
      tasksCounts: {
        done: 98,
        all: 136
      },
      hours: {
        spent: 238,
        committed: 968
      },
      resources: [
        {
          resource: {
            name: "Smith Cain",
            code: "smith_cain",
            avatar: {
              imageUrl:
                "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            }
          },
          efforts: [
            {
              progress: 100,
              date: "2019-01-07",
              half: true,
              days: 1
            },
            {
              progress: 40,
              date: "2019-01-09",
              days: 2
            }
          ],
          dailyEfforts: [
            {
              progress: 100,
              hour: 8,
              duration: 4
            },
            {
              progress: 100,
              hour: 13,
              half: true,
              duration: 4
            },
          ]
        },
        {
          resource: {
            name: "John Doe",
            code: "john_doe",
            avatar: {
              imageUrl:
                "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            }
          },
          efforts: [{
            progress: 40,
            date: "2019-01-08",
            days: 4.5
          }],
          dailyEfforts: [
            {
              progress: 100,
              hour: 9,
              duration: 3
            },
            {
              progress: 100,
              hour: 15,
              half: true,
              duration: 5
            },
          ]
        },
        {
          resource: {
            name: "Lyndia Kain",
            code: "lyndia_k_2"
          },
          efforts: [{
            progress: 70,
            date: "2019-01-08",
            days: 2
          }],
          dailyEfforts: [
            {
              progress: 100,
              hour: 8,
              duration: 3.5
            },
            {
              progress: 100,
              hour: 13,
              duration: 4.5
            },
          ]
        }
      ]
    },
    {
      id: 8982,
      title: "AWS pricing research",
      tasksCounts: {
        done: 98,
        all: 136
      },
      hours: {
        spent: 238,
        committed: 968
      },
      resources: [
        {
          resource: {
            name: "Smith Cain",
            code: "smith_cain",
            avatar: {
              imageUrl:
                "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            }
          },
          efforts: [
            {
              progress: 100,
              date: "2019-01-07",
              half: true,
              days: 1
            },
            {
              progress: 40,
              date: "2019-01-09",
              days: 2
            }
          ],
          dailyEfforts: [
            {
              progress: 100,
              hour: 9,
              duration: 3
            },
            {
              progress: 100,
              hour: 15,
              half: true,
              duration: 5
            },
          ]
        },
        {
          resource: {
            name: "John Doe",
            code: "john_doe",
            avatar: {
              imageUrl:
                "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            }
          },
          efforts: [{
            progress: 40,
            date: "2019-01-08",
            days: 4.5
          }],
          dailyEfforts: [
            {
              progress: 100,
              hour: 9,
              duration: 3
            },
            {
              progress: 100,
              hour: 15,
              half: true,
              duration: 5
            },
          ]
        },
        {
          resource: {
            name: "Lyndia Kain",
            code: "lyndia_k_2"
          },
          efforts: [{
            progress: 70,
            date: "2019-01-08",
            days: 2
          }],
          dailyEfforts: [
            {
              progress: 100,
              hour: 9,
              duration: 3
            },
            {
              progress: 100,
              hour: 15,
              half: true,
              duration: 5
            },
          ]
        }
      ]
    }
  ],
  teams: [
    {
      id: 78192,
      name: 'Design Team',
      code: 'design_team',
      resources: [
        {
          resource: {
            id: 89121,
            name: "Misha Adrisov",
            code: "misha_ad_2"
          },
          efforts: [{
            board: {
              id: 78912,
              name: 'Google cloud platform',
              code: 'google_cloud_platform'
            },
            progress: 70,
            date: "2019-01-08",
            days: 2
          }],
          dailyEfforts: [{
            board: {
              id: 78912,
              name: 'Google cloud platform',
              code: 'google_cloud_platform'
            },
            progress: 70,
            hour: 8,
            duration: 4
          }]
        },
        {
          resource: {
            id: 89122,
            name: "Lucinda Stevenson",
            code: "lu_ste_091"
          },
          efforts: [{
            board: {
              id: 78913,
              name: 'Phisiotec',
              code: 'phisiotec'
            },
            progress: 70,
            date: "2019-01-07",
            days: 2
          },
          {
            board: {
              id: 78912,
              name: 'Google cloud platform',
              code: 'google_cloud_platform'
            },
            progress: 70,
            date: "2019-01-10",
            days: 1
          }],
          dailyEfforts: [{
            board: {
              id: 78913,
              name: 'Phisiotec',
              code: 'phisiotec'
            },
            progress: 70,
            hour: 8,
            duration: 4
          },
          {
            board: {
              id: 78912,
              name: 'Google cloud platform',
              code: 'google_cloud_platform'
            },
            progress: 70,
            hour: 13,
            half: true,
            duration: 4
          }]
        },
        {
          resource: {
            id: 89123,
            name: "Georgia Williams",
            code: "geo_williams"
          },
          efforts: [{
            board: {
              id: 78914,
              name: 'Instagram tool',
              code: 'instagram_tool'
            },
            progress: 30,
            date: "2019-01-08",
            days: 2
          },
          {
            board: {
              id: 78915,
              name: 'Social app',
              code: 'social_app'
            },
            progress: 70,
            date: "2019-01-10",
            days: 1
          }],
          dailyEfforts: [{
            board: {
              id: 78914,
              name: 'Instagram tool',
              code: 'instagram_tool'
            },
            progress: 30,
            hour: 8,
            half: true,
            duration: 3.5
          },
          {
            board: {
              id: 78915,
              name: 'Social app',
              code: 'social_app'
            },
            progress: 70,
            hour: 13,
            half: true,
            duration: 4.5
          }]
        }
      ]
    },
    {
      id: 78193,
      name: 'Vikings dept 2',
      code: 'vikings_2',
      resources: [
        {
          resource: {
            id: 89121,
            name: "Misha Adrisov",
            code: "misha_ad_2"
          },
          efforts: [{
            board: {
              id: 78912,
              name: 'Google cloud platform',
              code: 'google_cloud_platform'
            },
            progress: 70,
            date: "2019-01-08",
            days: 2
          }],
          dailyEfforts: [{
            board: {
              id: 78912,
              name: 'Google cloud platform',
              code: 'google_cloud_platform'
            },
            progress: 70,
            hour: 13,
            half: true,
            duration: 4.5
          }]
        },
        {
          resource: {
            id: 89122,
            name: "Lucinda Stevenson",
            code: "lu_ste_091"
          },
          efforts: [{
            board: {
              id: 78913,
              name: 'Phisiotec',
              code: 'phisiotec'
            },
            progress: 70,
            date: "2019-01-07",
            days: 2
          },
          {
            board: {
              id: 78912,
              name: 'Google cloud platform',
              code: 'google_cloud_platform'
            },
            progress: 70,
            date: "2019-01-10",
            days: 1
          }],
          dailyEfforts: [{
            board: {
              id: 78913,
              name: 'Phisiotec',
              code: 'phisiotec'
            },
            progress: 70,
            hour: 8,
            half: true,
            duration: 3.5
          },
          {
            board: {
              id: 78912,
              name: 'Google cloud platform',
              code: 'google_cloud_platform'
            },
            progress: 70,
            hour: 14,
            duration: 4.5
          }]
        },
        {
          resource: {
            id: 89123,
            name: "Georgia Williams",
            code: "geo_williams"
          },
          efforts: [{
            board: {
              id: 78914,
              name: 'Instagram tool',
              code: 'instagram_tool'
            },
            progress: 30,
            date: "2019-01-08",
            days: 2
          },
          {
            board: {
              id: 78915,
              name: 'Social app',
              code: 'social_app'
            },
            progress: 70,
            date: "2019-01-10",
            days: 1
          }],
          dailyEfforts: [{
            board: {
              id: 78914,
              name: 'Instagram tool',
              code: 'instagram_tool'
            },
            progress: 30,
            hour: 8,
            duration: 4.5
          },
          {
            board: {
              id: 78915,
              name: 'Social app',
              code: 'social_app'
            },
            progress: 70,
            hour: 14,
            duration: 3.5
          }]
        }
      ]
    },
  ]
}
