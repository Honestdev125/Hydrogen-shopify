export function HomeFirstView() {
  return (
    <div className="z-auto bg-neutral-200">
      <div className="flex h-96 w-full flex-col items-center justify-center gap-y-4">
        <h1 className="whitespace-pre text-center text-5xl leading-tight lg:text-6xl lg:leading-tight">
          {"UNINOVERSE\nOPEN"}
        </h1>
        <p className="text-xl">{"2024.4.30"}</p>
      </div>
      {/* <Carousel className="">
        <CarouselContent>
          <CarouselItem>
            <img
              src="https://baak.pimgu.in/ProductAssets/ProductImages/1219/image-thumb__1219__high-1920px/71522_Reeny_Seite_rechts_1_0.pngdata:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFoAWgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAGBwAFAgMEAQj/xAA9EAABAwMDAgMGAwQJBQAAAAABAgMEAAURBhIhBzETQVEUImFxgZEyUqFCwdHSFRY1YoKSsdPwI0VydJP/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMABP/EACIRAAMAAgICAgMBAAAAAAAAAAABAgMRITESQQQyExRCBf/aAAwDAQACEQMRAD8AeNShHqHf7bY40T+knLgwp1SyxJiIJDagB+PkDnPbzwaXsXqPEuLzbUzULrKUHecgo7c9wME8YGfWpXkcPXjseYVex4VKW1u6iNBLba7ra5ZPh7sOjcNwJ/ZPOABnjucUa6evCL3b0ykx5DB7KS8ytvn+7vSNw+I4oxkVgqXJYodbWtbaHEKW2QFpCslORkZ9OK0JuMNU8wUyWjKSncWgr3gP+eVJy+X662zWGoFLseoFJfd2NrhBaULSlJCVbgOeMHjtzVIb3GjXDfPh3K1xi/vaDrLgcaGTuVuV3UAe9SyZbnqQH0RUpXW/qDOf8Nqwx5l8UVYLS4akqQOTguj3BgbE5I5OTnGMm+pjKd0jcCltbMlcNW5CMuKQSn3gNvKiOe3fyqyva3oy5ZbvOtsMuPPLCG20lS1HskDkmsY0hmUyl6M6h5pfKVtqCgfqKSlylpNwfgW3UdyXagxuSJYkYWrsWyAj92MVywb3OszVuftMqc89IU4uTFREdLbWFJ2ggDncBzjyGK538mvL68HSvjy5+3I+qlAWjdR6mus+GxLtMhEJLa/aZciOprceSkgKCfgMAHzNHtdGO1a2iFw4emSsFFtBSFFCSs4SDgZPwpYdbr/dLAqyPW64Ow2nC+l0tqxuVhG3I8/2vvSpuN7ulxDFxuVwmOoCv+hIdWoICh+Q9gePL0pm9Amd+z6nAA7ACvaR1g60SLfERHvMdFxKeEvtvBDhHxGMKPx4/fTU0hqQant7ktNsnwAhzYETGtm/jO5J8xWT2Zy0XtecHI7+tKa768Fr1RcoL14LKmnykIUCQn0GCCO2K6G9RSYl0dkruCEOuAF1l4BB4GOU8ccema5a+WpfMs6Z+K6XFIaVSgqL1EgOLQy4wtx5X7EY71K+Se9W2uJkmNom8zLetbUhuC442sApUj3c59QQKvjyxkW5ZDJivG9Ui/qV88ad6uaojNkvLZurLSdzvjNbVIT8VoxgfFQNddo6xXS3y31S0N3CC66pxKHXAlxncSdqVgYKRnABHl3HaqEx+VKB9HdSoeq5zcWJZrs0FhWZKmQthBAJwpaScdsc+dHFYxittC8b0JVjtkZqBCAnYEpCfQDigzqPqC7WFVtVasBLpc8Xc3vBxtwD6dz9qX1017f5j7DjktMcsq3JRHSUAn45JJ+R4qN5pl6LRgqlseSGGW1bm2m0n1SkCtlLqxdU7c4wG7426w+nu602VIX8cDkH6Y/0ozsV9t1/jLk2p8vNIXsUotqRg98e8B6083NdMSsdT2jtVHYUoqUy2VHuSkZrJxtt0bXEJWB5KGaROpuo2pbJqu8wWLgz4LcpSW2nm0q8NPlg9+2DzmtGn+qU1gqcuoVMe3FSJbO0L/8AFSeEqT9uw8wCHEH62020CG0JQD+UYrJQCklKgCCMEHzpWs9cbCFBM223JnnBUkNqSPj+IH9PvRtqi7Lj6Mn3e1vAKTDMhh7bkY25CsH4c81jFy2y00SW2kIJ80pArH2eOo7vBaJPOdgpFO9Yr5IgqitotxfWkjxWkKKsY5IG7AOPPt8K06F6j/1aHszkV2RaygBLTbgKmlDzTnjnzGR659RsbxPoHt2qUD6X6oWPUt6RaIcW4sylpKk+O0jbwMnJSpWPrgUcURTmmQIk4JEyO28Ecp3pzitabRbRHMf2CMWVHJbU0CCfkaDuqOr7tpR+0qtTLLqJAe8ZLzZUDt2Y7EEfiNLi49TNR3SW0v2xNtDSsttRU7QT6r3Z3ceR4+FI1O965LxjtzvfA7UaW0+he9Nkt4V/6yf4VbNNoabS20hKEJGAlIwB9KUVo60ttxgi9Wx1x5PHixCkBfxKVHg/U0w9Iaohasti51vafaQ26WlofSAoKAB8iQRgjzopSuhbjJP2PJmjtNTpjk2ZZIL0lxW5bq2QVKPqTW25aW0/dHS7cbLb5Lp7uOR0lX3xmkvrbWN+iauvMeFeZTDCZBQlpLnCAEgcZ7ds8eteaQ6l3y2zFIui1XVnb7qnV4Wkem4cH6g/upHlWw/grWx02/Sunra4HIFjt0dwdnG4yAofXGaspcVibFdiy2kPMPIKHG1jIUk9wRQna+penJqB7RIcgunuiQg4/wAwyPviiC/3L+jtPzrkxsWpmMp1vPKVHHu/TOKoqVdE6lz2jmtukNOWua3Nt1lgxpTedjrTISpOQQcH5EivZ+kdOXF4vzrFbn3j3cXGRuPzOOaB7T1b4Si82s583Ya+/wDgV2/zGvLX1aUmQpF4twUwpatj0NXKU543IUfTHIP0ptMUZFutkC1s+BbIUaI1+SO0lA+wFddUdn1dYby42zAuLSn3M7WVgoWcDJwlQBPAPb0q8oGKPUmkrLqdUZV6iKfVG3Bkpfcb27sZ/CRn8I7+lcjfT/SzcEQxaGlNDPvKWouc+q87j9681xqb+rjcQpStS3ysBKcdhjnn5il+vqFdVXVuWFqQygYLO7clQ88jgH9PnSU59jzNdoN2OmOkmXg4LaVEchKnl4H60UQLfCtrPg2+IxGazkpZQEgn1OO5oUt3UuwSEbZrjkR0cHLaloJ/uqA7fMCiq23GHdIolW+S3IYJI3tnPI8j6GivH0CvL2aZFlt8hxTj0cKUo5JKjya5laWsqjlUFo/MUF37qlIst9uNtXaWpCY7uxpYfLZxgdxtOeflQvZuol8Y1E5cZZU9CkqHjRATsQMYBbz2I+x8/Iii+Gq58UQr/QUPTpjgY07aGFbmoLST6gV3yIrEmK5FfaSthxBQpsjgpIxihuJ1D03J2BUxbClY915lQx8yAR+tWerLm7aNMXO5RQlT0aMtxvIyMgcEj0pPxLH/ADoos6yLarZXJ6faXH/awfm6v+NYq6eaWUf7Nx8n3P5qWNx6tXe6WlyF4DERbydq5MZa0rA89vPuk9s54zV3pfqwY7CI+o21PJBCRLYAKv8AEnzx+Yfat4ol+1DetjCs+k7FZpAkW+3ttvgEB1SitSc98FROKu6GLBr7TmoLim32yatcpSSpLa2VpyB35IxRPRLJ75KLVGl4mpPZva3nm/Z923w9vO7Gc5B9KoD0ttCu8uX90/wo8qUrlMdZKS0gEb6W2VJyqTMUPTKP5aKbHZIFiiqj25tSELVuXuUSVHGM/p5VZVKKlI1ZKpabAW79MYF0ucq4OXm7ockuFxTYcaU2nPkkKQcD61zJ6Uwh3vU9Q9CzH/26YdSiuOiblV2tgbb+m9kiL3PuzJhByPFWlGP/AJpTkfA5oqkQmH4KoSm0iOpHh7AkYCfTHbFdFSs+ewzqegcTomw59+AwtPmktJAP2Fcy+nWmFOFYtraR+UDgUWVKRY5XoZ23yyrtOn7VZ/7OhMsn8yUgGrSpUpkkugNt9n//2Q=="
              alt=""
              className="justify-center rounded-2xl border-grey-200"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://baak.pimgu.in/ProductAssets/ProductImages/2628/image-thumb__2628__high-1920px/6346_Bruno_Seite_links_1_0.png"
              alt=""
              className="justify-center rounded-2xl"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel> */}
    </div>
  )
}
