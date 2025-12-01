/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.css';

const MyContent = ({ content }:any) => {
      return (
            <div
                  className="blog_content py-4"
                  dangerouslySetInnerHTML={{ __html: content }}
            ></div>
      )
}

export default MyContent
