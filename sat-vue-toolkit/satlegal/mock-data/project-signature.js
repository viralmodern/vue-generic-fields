export default {
  contracts: [
    {
      id: 1,
      name: "Asset Purchase Agreement",
      listSignature: [
        {
          id: 100,
          userId: 1
        },
        {
          id: 101,
          userId: 2,
          signed: false
        },
        {
          id: 103,
          userId: 3,
          signed: true
        },
        {
          id: 104,
          userId: 4,
          signed: true
        },
        {
          id: 105,
          userId: 5,
          signed: true
        }
      ]
    },
    {
      id: 2,
      name: "Assignment and Assumption Agreement",
      listSignature: [
        {
          id: 100,
          userId: 1
        },
        {
          id: 101,
          userId: 2
        },
        {
          id: 103,
          userId: 3,
          signed: true
        },
        {
          id: 104,
          userId: 4,
          signed: true
        },
        {
          id: 105,
          userId: 5,
          signed: true
        }
      ]
    },
    {
      id: 3,
      name: "Bill of Sale",
      listSignature: [
        {
          id: 100,
          userId: 1,
          signed: false
        },
        {
          id: 101,
          userId: 2,
          signed: false
        },
        {
          id: 103,
          userId: 3
        },
        {
          id: 104,
          userId: 4
        },
        {
          id: 105,
          userId: 5,
          signed: true
        }
      ]
    },
    {
      id: 4,
      name: "Letter of Intent",
      listSignature: [
        {
          id: 100,
          userId: 1,
          signed: true
        },
        {
          id: 101,
          userId: 2,
          signed: false
        },
        {
          id: 103,
          userId: 3
        },
        {
          id: 104,
          userId: 4,
          signed: true
        },
        {
          id: 105,
          userId: 5,
        }
      ]
    }
  ],
  listSignatured: [
    {
      id: 1,
      name: "Jim Irsay",
      avatar: {
        imageUrl:
          "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912741/62358463-avatar-man-smiling-cartoon-with-beard-male-person-user-vector-illustration.jpg"
      },
      signatures: {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Nguy%E1%BB%85n_V%C4%83n_B%C3%ACnh_%2C_Nguyen_Van_Binh_signature.png",
        dateSubmitted: "2019-03-07T07:48:26.593Z"
      },
      role: "Seller"
    }, {
      id: 2,
      name: "David Decker",
      avatar: {
        imageUrl:
          "https://www.mobelti.com.tr/wp-content/uploads/2017/11/man-avatar.png"
      },
      role: "Buyer"
    },
    {
      id: 3,
      name: "Billy Silo",
      avatar: {
        imageUrl:
          "https://www.shareicon.net/data/2016/06/25/786547_people_512x512.png"
      },
      role: "Investors"
    },
    {
      id: 4,
      name: "Jim Smith",
      avatar: {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3CgTTxDBkArxvYT_Bta7VsQNDWu2ZXtIQCqFWWJZrQsn05flF"
      },
      signatures: {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Sergei_Loznitsa_Signature.svg/800px-Sergei_Loznitsa_Signature.svg.png",
        dateSubmitted: "2019-03-07T07:48:26.593Z"
      },
      role: "Investors"
    },
    {
      id: 5,
      name: "Tess Tucker",
      avatar: {
        imageUrl:
          "https://openclipart.org/image/2400px/svg_to_png/261881/Cartoon-Man-Avatar-2.png"
      },
      signatures: {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Nguy%E1%BB%85n_V%C4%83n_B%C3%ACnh_%2C_Nguyen_Van_Binh_signature.png",
        dateSubmitted: "2019-03-07T07:48:26.593Z"
      },
      role: "Board Member"
    },
    {
      id: 6,
      name: "Jeffrey Cantrell",
      avatar: {
        imageUrl:
          "https://icons-for-free.com/free-icons/png/512/2694137.png"
      },
      signatures: {
        imageUrl: "https://designdroide.com/images/david-bowie-signature.svg",
        dateSubmitted: "2019-03-07T07:48:26.593Z"
      },
      role: "Buyer"
    },
  ]
}