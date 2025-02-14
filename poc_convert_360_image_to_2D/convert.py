from PIL import Image
import numpy as np
from scipy.ndimage import map_coordinates
from tqdm import tqdm

def map_to_sphere(x, y, z, yaw_radian, pitch_radian):
    theta = np.arccos(z / np.sqrt(x ** 2 + y ** 2 + z ** 2))
    phi = np.arctan2(y, x)

    theta_prime = np.arccos(np.sin(theta) * np.sin(phi) * np.sin(pitch_radian) +
                            np.cos(theta) * np.cos(pitch_radian))
    phi_prime = np.arctan2((np.sin(theta) * np.sin(phi) * np.cos(pitch_radian) -
                            np.cos(theta) * np.sin(pitch_radian)),
                           np.sin(theta) * np.cos(phi))

    phi_prime += yaw_radian
    phi_prime = phi_prime % (2 * np.pi)

    return theta_prime, phi_prime


def interpolate_color(x, y, img, method='bilinear'):
    if method == 'nearest':
        order = 0
    elif method == 'bilinear':
        order = 1
    elif method == 'bicubic':
        order = 3
    else:
        raise ValueError(f"Unsupported interpolation method: {method}")

    coords = np.array([[y], [x]])

    red = map_coordinates(img[:, :, 0], coords, order=order, mode='reflect')[0]
    green = map_coordinates(img[:, :, 1], coords, order=order, mode='reflect')[0]
    blue = map_coordinates(img[:, :, 2], coords, order=order, mode='reflect')[0]

    return (int(red), int(green), int(blue))

def panorama_to_plane(panorama_path, FOV, output_size, yaw, pitch):
    panorama = Image.open(panorama_path)
    pano_width, pano_height = panorama.size
    yaw_radian = np.radians(yaw)
    pitch_radian = np.radians(pitch)

    output_image = Image.new('RGB', output_size)

    W, H = output_size
    f = (0.5 * W) / np.tan(np.radians(FOV) / 2)
    print(f'focal length is {f}')

    for u in tqdm(range(W)):
        for v in range(H):
            x = u - W * 0.5
            y = H * 0.5 - v
            z = f

            theta, phi = map_to_sphere(x, y, z, yaw_radian, pitch_radian)

            U = phi * pano_width / (2 * np.pi)
            V = theta * pano_height / np.pi

            U, V = int(np.clip(U, 0, pano_width - 1)), int(np.clip(V, 0, pano_height - 1))
            color = interpolate_color(U, V, np.array(panorama))
            output_image.putpixel((u, v), color)

    return output_image


output_image = panorama_to_plane('panorama.jpg', 120, (400, 200), 180, 90)
output_image.save('output.jpg')
output_image.show()