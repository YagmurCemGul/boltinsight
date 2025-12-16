import { cn } from '@/lib/utils';

interface BoltLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function BoltLogo({ className, variant = 'light' }: BoltLogoProps) {
  const color = variant === 'dark' ? '#C8C4E9' : '#231E51';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 241.5 136.499996"
      preserveAspectRatio="xMidYMid meet"
      className={cn('h-full w-full', className)}
    >
      <defs>
        <filter x="0%" y="0%" width="100%" height="100%" id="whiteFilter">
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" colorInterpolationFilters="sRGB"/>
        </filter>
        <filter x="0%" y="0%" width="100%" height="100%" id="grayFilter">
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0" colorInterpolationFilters="sRGB"/>
        </filter>
        <clipPath id="boltClip">
          <path d="M 0.191406 0 L 240.808594 0 L 240.808594 136 L 0.191406 136 Z" clipRule="nonzero"/>
        </clipPath>
        <mask id="boltMask">
          <g filter="url(#whiteFilter)">
            <g filter="url(#grayFilter)" transform="matrix(0.747263, 0, 0, 0.747263, 0.19161, 0)">
              <image x="0" y="0" width="322" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUIAAAC2CAAAAACJstv7AAAAAmJLR0QA/4ePzL8AAAy6SURBVHic7Z17VBfHFcfvjx8CCuKrUXxQEWOJglLRRlEJYrQx2Bil2kSrMb5ijTmeqjH10ZgEojapjTZYtQ9TE+tb6/FUm1iP70QjlmBEikoU8I1SBUV5yW/7B68fP+68d1c8nc8/wMydubNfdmd2787MAmg0Go1Go9FoNBqNRqPRaBoGDjS1Z3sstfCopU2xisF+WGrhUYDGz6IFUm6a4HWdgZFlQs2PgDz0YDIBoB2aY/xErH4vS1r9f4WWUBktoTJaQmW0hMpoCZXREiqjJVRGS6iMllAZLaEyWkJltITKaAmV0RIqoyVURkuojJZQGS2hMlpCZbSEymgJldESKqMlVEZLqIyWUBktoTJaQmW0hMpoCZXREiqjJVRGS6iMllAZLaEyWkJltITKaAmV0RIqoyVURkuojJZQGS2hMlpCZbwfdQM4eKpH+/DOHQIb+zgdrrKSwqvfZZzLPlvxqFtVg7KEjeat2rRs6mOUF925cfuOy4w2ueEdPjwqplXt385G/q1CYwAg7/SRXekmO6tm2nPkvPK37/NVwreYNjB25ppTpe4WZRlbFyWga5ll8B700W18uWsll5MH8PRDwotpadxvzdl4toSNui48fhP3Upz68aBm4oJ50j4p18U8orRZwcyKGqaE7RL/TT+8/D/+WE64arp9VsR3TIUfsURsgBJ6TTpUxuEsd/b3pAUM21nOf1SuT3/weEnoMzOb113ZSvqxkWiTXCx2XBVLWz4+EjqmnxNyuEqiU3wVP2YqWS89LhIOyRJ1mTcN34OESOhe8eMyDMPYQuwSG5KEVzazh8j6HHtKQEDH6DsSLgzDMIwcfMcU6yUUecBr/5LgGQUAANEZ87iLOVdvbC7hAgAAOu77pWxRNWx4RvZaejKEz/KJ49MUnpYcyzf6ypeWx5YwQ6+vBvKY9Uj5kZqfMamt2EamY0+kpt2uN9hGkbtDVP2EpylXIY5Nwa7AFYtZJr2Osp/VmAQfCFGvRBC74oXOBcvoBl33NTXDT6c9T5pRjQj2hVzn/I6W++TeFua46ba5jTkVcWNj1Hr2EnJe4D4TruJKeq23ORJvp7v5s0k5zs0h5rkZsspeDW31lkjaGTDxeTPdTBlrZm1MbJXQfz0euhk431Q3zuRwU+tjYO8533xTIJIauEnmwZHmZh2696hF2Nz1Ri1CEj8MMttN71lm10jB7vfIc+q/HRs61Xw3i228O1R+CXr+ZNrpnMJy8G7eKbJPWDjzklwZdc+jBast+Dc61gwxpAv/bC8l8y5nJXi8sD7ps8PqFox4gxnVXu7ha5x40I6HUTUOrN5RWEFC144YrGzcJnqx4rrDZVOJMD8P522TUPoiMg73HIVuFX5wTM8vaAX9PqhzsU/mjaQL0uVla+rlhX0W3hhJKe6Ymk0p6op1M21xmX1CyXGycZWLBnoWHuy7k5Jr/Ln/EXKuY6HbaZjQQa4BbHr3t6pmD+QkfH9oDt3gWiwltvVsv5pfHTOk/HMxz7qq6yAjoZH4dhnTaO5Css8pNb/G9pTwz0nfCOvqdkdGwnfe4bFaQrZ6pebqnSDhnhf/Fyys3A0JCZcm8dklJhOdVo+W3gni7vmZYvKjNwFxCT8nX6EezN1DyhlT9fN5LOpgGqFPW1l7DcISZk/jfnIqHXuVkBMVWflzvKh3MUZYW30VwhLOuMxve3ciSe7KWy8vxffGLGLZJiYgKuG6z0Ws9/2VkFF5z9Y7RNC7IH0CrK2/EkEJH3B3hJUsJEzMj/MDAIgSq0wYq8/yKi9i5iuuidnf+C2e7jcQAIAys94chlrtAEBUwqJVovV/QugNuwMAWD5idrHaAYCohF+QhlgiWbvx9FgAaGJ6wN8Tq3sKABCVUPgkBNiAJ3cHgEjL3zp0tPS+swqho7gj8S3Bvfh3+YIcAE+I1yZKd+tdiEm4/6G4g4Jv0GSfzgCmzQEh09Z6F2ISSn3Q8gCeHAYQKlOdGLTFFGYhJGGajIev8OSOAO1kqhOjwZ2F52Q8XMdXh7a2pS+0wYWQhMZtGQ93CtHkJgAmrHVkIb1+QAARCW9LjCYARffQZB8AG55gm1jvQmg2A++L/Lo8fIAmOwGcaAZuzsSJLpiwY9G/iA/Jtfx4MWJEOf6wlJfoY+JlCA+f+L+WiA3TkvCJai4AvF+QXH7TCE0tp5YhnBON8WQS1kvoh3d5ZQD4LgeSIwDe69F7BYLAguuorZewOT6Vv4TUt0rGHvB5/gXUMiV4cicxz9ZL2N4HTb4NgD89S+6Ogce18qllSvCuRPB+3HoJCU/CVwCuoxk95Nzg792vUMsYeLbgK3zrJRyOJ+cAXEAzBC+jar6Ppt6iFzqLpkaILYa0XsIf4snnSVdZkNSjc4swNJkhIf7E6hgk5NpyCXvgIbvCAgD8dWqzXjJuYtAR2W2iJko2niw2O85yCRPwm/dzAJCK9+bRMm4G4l7+Sy/1HZ6cIHRvarWETsLEo+MAUJqHZtEmf5JwvIgm5zCKpeH3jQETRXxbLWFCCJ5+AAAgBc0K7SvuJhoP3+IR81quE0bsX4j4tlhCx1t4upEBAHAIzfOROA0JS3Wok74BwDiIp0eqz8bh2zmOgwmEidCV++b1xzNLhB9Q2t5HKyr1BaDNtQaIJ7TvhECUzNqzsOV7hIzjAABwDH8+8RXqigAAFuBHnFLKKphWhKc//Sq/c2slTOpIyNgKAAAGYQLiu4K3huGT8HT267LrmYSMpfx3+JZKOOJ1Qsa1quDeLjzb5zdCbhwrCZfdenZZkkngNsVorTl9YRRxA7jqhgeUEgyELuU3CZX8pzKb1hdCa+I2iX8RPFoPTJEw9BKpdUbvaps/EAzyBaYhRJN2EptbmU+VED4lNpIwKY0TMyQMvkps3Okao5gKgsmpEF4/xP9UcdW9Il1Cwl2BYRjGHKHj9cAECcMukNv2Wo2VI5Vk80/O6HUr4n6A26os6BLC1+R2LlDoD9UlHEZZ4HnOrfcfS7TazxVyakNevBtXZcKQcCS5ocZa+TWWqhL6L6G0y5juZtksk2iWGsJ21IN8rh+pfkfIkNBxjNLUTOnVWYoSxn9LaZWR7e9u+xrZ8HI8y9FEyr68w6qNGBLCM7TGlq/yRz0zUZHQMeBftDYZRt1dZBzpZMuHK6j7eIVsoXipjTCwJARaNYZxZYbUZmLyErYecYSxHXCqRx89mGZ8YQL+8goA/KfS9iwtq53HzZQwooDe4pwVkeJL0SQl7PD6lmv01hhGeb2tXfdT7dPGosNik19TRnzDMP5Wa8qUEJJYjXalvDeYGHjA5V2HBkqL1pBqAfAJCAoJ5jnjl831TIk8QQ8S52/ccrLuS3OvYaNH0H0VRNROrM9Dh9WzXWt/D8zgWFhuXM++VFBculjpMwlmkInc7s1nlrq6Z8ELfYK8AZxBA15O3M7edfhXbtWzz0J4hnM3fOVNmU2gGHtHG0AZUdxxPSjh3BW6ToiGQ0L4gLP9qpsym8BbZ5DEovGEqJ0Hjsa+fN16rvAK03mE8DUP9kq4Cl/lfcrcbRSMRTnCRSZLTYIGAJslPPguIWP1FjPdLPtMvEz2aMIcJTZ2Spg1hjS5wPXzi+a52S61G2L6OHxCMxsbJcwdjL83BgCoiKFPIBLg66lys3F3vMl5u+KJfRJmx12i5F6Llz0JPDg3kj6nkMyfJHtk2yQ8P4AwgaWK9CHFZrjJir0hXXblK1Lnr10SHh7AWgx+YqD8wddwKo7cWbBZP07mDLZJwrWjGNPUACBlmMDOGThfjhReMF2Hzc8IrvoHsElCY+ZU+ozdSr6JzlHzsyFesQJIjz4hXMYOCTMjkvn2trna5R8Kbh7OHq8+JF3qlyQ5MHtg5jNy2e8FlsI4Zsl8G8kwDMO4TpqbyvOM7E70RYqXRxFmOCy40Uk3zpiDJ7uIn1kQlRB8k8hf4bNfwrxxgkuJAAIWSHxB69ZPyT2SsIQAnXeQHNkt4d1ZUh8S6nlI0I8rmfaBDgkJAZ5LwV3ZK2H2JOlPmMQdFnG0jb5QREpCgJitWLdso4Rlf38RX1jISdyXnOOKawPrVa+khADtltcfWOySsPjQdOUV/Y5+n5SwPd36EF+y4460hAA+gz722PHYDgnzD60YLjyE4DSbvJv6gdpb28fwRLEVJAQACJ+zPqv2jT8iIT7xJh9fWUXBqCgvvnkp90xunmygpD6Fa9d27D2qazesR7h3bd/ObxmrSqrIQreUICw5qU9GBngFBwdHhAQ18fN2FtePRNiz3akS7aMiQrt2alvdUlde5pmLmadNiEmYxGMgYSVOfz9fJ1SUlhThm7ZoNBqNRqPRaDQajUaj0Wg0Go1Go9GYwP8Av2pvsJsK/dYAAAAASUVORK5CYII=" height="182" preserveAspectRatio="xMidYMid meet"/>
            </g>
          </g>
        </mask>
      </defs>
      <g clipPath="url(#boltClip)">
        <g mask="url(#boltMask)">
          <rect x="0" y="0" width="241.5" height="136.5" fill={color} />
        </g>
      </g>
    </svg>
  );
}

export function BoltLogoIcon({ className, variant = 'light' }: BoltLogoProps) {
  return <BoltLogo className={className} variant={variant} />;
}
