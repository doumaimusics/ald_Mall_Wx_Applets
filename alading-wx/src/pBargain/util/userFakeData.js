const mockUserList = [
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJTU3BmTfo4g0yAj8tUZqVG5LXBkjHljGmY5NNk83BeFmlC4hWU1ojr6d9hnIibCqqL2BicbRl1Fc4g/132',
    userName: '156****8767',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIGuXhUHpOhmPgzEoZjJbxDMWGq6Ff9QbJcicI1HXP3e1MnHsNCKstvATeYuJU0kXLv2oynt3pOibNw/132',
    userName: '132****6269',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqhhw3XJERuXuLc2nL8nrxqlAYMLBq4M9TX55PDOficZreyUJmLaHRuMgUCEcicG2CXXbiahZLPy3IsA/132',
    userName: '130****4915',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erf6V4kGib2a8FicWzSiaT8THwmuTBdOzoaRAUyvB52IXvlpQgibszQxvo7tV3VjicD7xUI42xAnoF9ckQ/132',
    userName: '159****9556',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIByyHWKlAmWQyMWN26k5TicbkG53NUiaQU0YbKvTZzZyx76NicjAzxJCCGHqOYica2ZHZ5ohY1TcM2Pw/132',
    userName: '187****0576',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ74tnUXqKoJYJhgA4NllKlNc1tsA6IE0AicRzEDITSkGtP3Mcpat4ibiaVkcxm36icjbXnO0apR3qO6w/132',
    userName: '158****6133',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIv49HARne2UVdsLrK5ic7nfP73icflsCF27R6y9tj8zzHmmdzCtfP21coj1I1wRmIQNwRB1nsaLWiaA/132',
    userName: '136****7196',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIpLdmyhP1YU8Zq47lfAB9RkvgW5M4UmcRUOkRkXeEUECeWWOLMmv78eISG2x9FNl5t1oexCeJ33Q/132',
    userName: '139****4662',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJH5aePJFledZP19rlJNPE36a70jrInhcCmdXIE0BFrW2aeLibjZX4Xp71pRx8g1lXibBibgdNicw37icg/132',
    userName: '157****1549',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoh1DXoWW6Q78SGyk2SBEeEFelMicejkfiaribmsa78ia8ujeqP2FmwUODVOichBTMfJPvJ2AjMc8dtvxA/132',
    userName: '186****8602',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIicTLJMN656Mop9XIAmnu9fvia510Ohr3BcK1y1S70NDEib06zsGdiacBxZhnPjgw6JmOGWpeoonQdWg/132',
    userName: '158****6137',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKN7qoicQYDMlvia42VJ2RSQNYu7EcoV5XeZ8XaK35P0CiaWaiajyKDe3QOgzhza6jmvCxgOickVuzPp2w/132',
    userName: '177****5580',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/SKFIE9UH7lgSAfG30F03OjIvniaRZyRDndJzBfOH8k6Psxm69oKrewfNhCibvXTFXvbuTvwiajNWtmL7Dl2FKXCqg/132',
    userName: '158****0051',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq5tIy8LaGwcjgEtwJvxjyC8IYiaSpbicETwSNcjUk00pLdRb7qV9yTWybOrft3kfI8U0C7jPjsIl1Q/132',
    userName: '182****0193',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep9DjsibOUXaWfw8nG3aCHialLQuoicCibsDN8rDEuoicshj0zQSegueRu0UIk5PTm3atOibribpNecCDrUA/132',
    userName: '158****6879',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epStylOR1Ov8O80Mf7b5ncqaZwBy2BKzaheOh0zdadqqutgYmapofkWuIL711hUN6bhq1Lsr9ic0Nw/132',
    userName: '156****2128',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLgiaVurSkIWUZtevkNzfDWibVmpoWp0T3U4zE5YZu9icVCib4uAFrYy5Ak31HDJdT9795GEzhDYRYBug/132',
    userName: '187****8440',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/WMyGLl5ibvgs8zYuBGiasXkETvlg5GCMR8FYdkTibj095C7GceRPK2fDSY1yyAlibkiccmTbTNxhRHnjXNZXAxkfCibw/132',
    userName: '186****5025',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoH5krkPFCjglAdz0VX6YXoz0bFtVZuRPtWicicgvQII5lZT2Mf8gHWiavejZMBdF9Qc6R2sX2849SUw/132',
    userName: '187****9317',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIfanFzmAMw8COkknGE1mYkiaxjYMrjWfRL5tn4JGVQlp6mnzs9lwHxjibQA30XibtjWBf3TWusP6ricQ/132',
    userName: '182****5749',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqSibO3TLjzN4AVy1PkUONgLsM6bClBMSqBuah5VunRzFS1AKicEouCKoyswqxzjxHJCIampichvyPzg/132',
    userName: '135****5276',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKlicnRBVQwm3uZmeSHsJ6uIEJN4OWWq7xpzyqzLPOGibtgFzqyH9OTD15TAPHxURR99CFEca8WRSw/132',
    userName: '151****4746',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epK1zYRhChAz4EnKewE89ibyRQst0V9icaAv43mSLG3RTWYTstxN1XzTRp2fWIt6icPltgtS1SdujYibQ/132',
    userName: '155****9987',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoTsDNiajtzNQJt7LARp4RQicrETGLKjBicFhqOYMRh0JKl5NR2icAXtGfOqYJYr5XGAKXVnwdbMibFMTw/132',
    userName: '187****7127',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEL7VKMLgUDF8ZfVmZh1Ekial5scBoARDhicr7wZmNGUujQBLtTYxsmthic3JoRHzrAC1g9L2IkqUT6cw/132',
    userName: '187****2249',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKmLlP4j7HgfCZsFIY5RX4qPoriaMLkGoKqdb2hLxJkk96wnuNKeYdwJ0aTu8v1Ll0asbxtiaZCBfjQ/132',
    userName: '178****8825',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJtiaibXUWvhhCqnO2sBibuDRE151rpfJKxPhluOTsKUg0fD7BTFyfta7QFVfibd6IfAE45BGe7bllYfw/132',
    userName: '1814****081',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK1qqzOJibW98mwyfZB0icmGfSKHGk4DibH9HQoCZp5UZqqeyCda2y5PibQcuCoxHmuQ2q1TiapviaVMgCg/132',
    userName: '1732****657',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eooWBfEJXXibwMy4Ue6gFiaS8kS3w9TeplBy41Fw7SuqgdicTwMRKeEPe6zlwXYjTTNF9ib7ialTgIDY0A/132',
    userName: '182****5249',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJamFEYC8z5xo5eSxJBT6ZvWBJRuCyzGfmOmXQr8eeDgokiakJuNfuXBHiaeiauAWYTNcYYIWwFJibX2A/132',
    userName: '137****6886',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqj595ktgI8uPM5mGWX9Ufq35cc51TB0613zPoKFE3MiapuEFpe7bqiciaTAFwPSyEEiaTLZqxd8NpU3Q/132',
    userName: '153****5702',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIV2wGkGic0BZvwViam0x8sm8zSY5LWePkkSdE948cibpELbTbiberbia2Tqx7UAndpBhAPvfTGUHvQ5FQ/132',
    userName: '133****7054',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epHDgId6eibC9qqkdX7OmImgaHF1AfqfD3tyD2vD5rnUFnlYqdzlvNzqgpSklOw0VsxCmq3QOMsC8Q/132',
    userName: '187****5989',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqmEdq4orZt8976ia2uWO98pS97cqmFMmbgqIHAjsEuy7KlyvCmyNKibAzVkYTrnn6sU2aTcbYhQphg/132',
    userName: '134****4882',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJtsQmxy0NwUl2KIhYcicfzJDqVf1onD1ISicicyJEbLaxjAlErH2Rh1M2eW3Yf5Hf35wjfbbZUhj4qA/132',
    userName: '137****4366',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLibI0yGugYMZe2DqVgdQ5F83DRL9mO3njzvp0JEZjKGhlAX2yuPdibtEs8hctaxiaNibY8OonPOJRgzA/132',
    userName: '13858166799',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJjXX34jpBeUFdArpZaE0LYWVE8bVXjW7iatFsOwyK7oYQtBmGzTJxc0ClHBOey7V37dEhZSL9uE0w/132',
    userName: '176****6915',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM48cbAvEibjzwvDLkuWU4e9ORCicIFSQu6icY3Atq80AVVMiaSTqSlAta44Mlh6nBPgqP7iaT0fDsJia1PA/132',
    userName: '135****2080',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKceXI433sun0fhWiakWmJKpRk0mW754uyuCIwlsSCjC1YgTCmawNrqAh7mrZ4ZcPmagzibVVicH5UoA/132',
    userName: '150****4729',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIqMjf3CZdRB4BsMYaiaLWFPeyibtJlUOOnCWsIgtPUfknejtVMaP8n3fRBR2aFtiaRpxZ44UFyNtjFw/132',
    userName: '186****2099',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWs9k73c1taKqtD8hUvZYdtOFvwb1juuzTgFXxe7HiaoNYhiaz5u3Az8krv2X50yEuKyzjycyqsKg/132',
    userName: '176****8303',
    text: '刚刚砍价成功'
  },
  {
    avatar:
      'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJpBl6xwMmnsGCw6ib6eY9cRgOBjj1HCYh9JQ5D0uqbY8fbX8bxcM7eKmomTQ89GRMeL9hDEicVwFvA/132',
    userName: '183****8261',
    text: '刚刚砍价成功'
  }
]

export default {
  mockUserList
}
